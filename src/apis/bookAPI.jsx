import { Button } from 'antd';
import axios from '../utils/axios';
import { getAddress } from './mapAPI';
import { Link } from 'react-router-dom';

export const bookDirect = async (data) => {
	const result = await axios.post('/booking/request-ride', data);
	return result.data;
};

export const getHistory = async (phone) => {
	const result = await axios.post('booking/getLocations', phone);
	const history = [];

	const getAllAddress = async () => {
		let i = 0;
		for (const item of result.data) {
			const startAddressPromise = getAddress(item.startLocation);
			const endAddressPromise = getAddress(item.endLocation);

			const [startAddress, endAddress] = await Promise.all([
				startAddressPromise,
				endAddressPromise,
			]);

			history.push({
				stt: i + 1,
				time: new Date(),
				pickupAddress: startAddress,
				destinationAddress: endAddress,
			});
			i++;
		}
	};

	await getAllAddress();

	// await getAllAddress();

	return history;
};

export const getAllWaiting = async () => {
	const result = await axios.get('/booking/getBookingPositions');
	console.log(result.data);
	const waiting = result.data.data?.map((item, index) => {
		return {
			stt: index + 1,
			time: '9:00 AM - 18/08/2023',
			phoneNumber: item.phoneNumber,
			status: (
				<Button>
					<Link to={`/detailLocate/${item.bookingPositionId}`}>Kiem tra</Link>
				</Button>
			),
		};
	});

	return waiting;
};

export const getDetailBookingPosition = async (id) => {
	const result = await axios.get(`/booking/getBookingPositionById?bookingPositionId=${id}`);
	console.log(result.data);
	return result.data.data;
};

export const createBooking = async (data) => {
	const result = await axios.post('booking/createPosition', data);
	return result.data;
};
