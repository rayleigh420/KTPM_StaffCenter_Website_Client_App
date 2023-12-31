import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './style.css';
import { Button, Space } from 'antd';
import { AimOutlined, CloseSquareFilled, ExportOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCoordinates } from '../../apis/mapAPI';
import { bookDirect, createBooking, getHistory } from '../../apis/bookAPI';
import useDebounce from '../../hooks/useDebounce';
import { toast } from 'react-toastify';

const columns = [
	{
		title: 'STT',
		dataIndex: 'stt',
		key: 'stt',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Thời gian',
		dataIndex: 'time',
		key: 'time',
	},
	{
		title: 'Địa điểm đón',
		dataIndex: 'pickupAddress',
		key: 'pickupAddress',
	},
	{
		title: 'Địa điểm đến',
		key: 'destinationAddress',
		dataIndex: 'destinationAddress',
	},
];

function Receive() {
	// const [bottom, setBottom] = useState('bottomRight');
	const [page, setPage] = useState(1);

	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [sourceAddress, setSourceAddress] = useState('');
	const [targetAddress, setTargetAddress] = useState('');
	const [type, setType] = useState('');

	const [sourceCoor, setSourceCoor] = useState({});
	const [targetCoor, setTargetCoor] = useState({});

	const debounceValue = useDebounce(phone, 3000);
	// console.log(debounceValue);

	const sourceAddressMutation = useMutation({
		mutationKey: ['coordinate', sourceAddress],
		mutationFn: (sourceAddress) => getCoordinates(sourceAddress),
		onSuccess: (data) => {
			console.log(data);
			setSourceCoor(data);
			targetAddressMutation.mutate(targetAddress);
		},
		onError: (err) => {
			console.log(err);
			toast.error('Something wrong. Please try again!');
		},
	});

	const targetAddressMutation = useMutation({
		mutationKey: ['coordinate', targetAddress],
		mutationFn: (targetAddress) => getCoordinates(targetAddress),
		onSuccess: (data) => {
			console.log(data);
			setTargetCoor(data);
			bookDirectMutation.mutate({
				phoneNumber: phone,
				pickup: sourceCoor,
				destination: targetCoor,
				price: '100000',
				vehicleType: type,
				paymentMethod: 'cash',
			});
		},
		onError: (err) => {
			console.log(err);
			toast.error('Something wrong. Please try again!');
		},
	});

	const bookDirectMutation = useMutation({
		mutationKey: ['book', phone, name, sourceCoor, targetCoor, type],
		mutationFn: (info) => bookDirect(info),
		onSuccess: (data) => {
			console.log(data);
			toast.success('Booking success!');
			setName('');
			setPhone('');
			setSourceAddress('');
			setTargetAddress('');
			setSourceCoor('');
			setTargetCoor('');
		},
		onError: (err) => {
			console.log(err);
			toast.error('Something wrong. Please try again!');
		},
	});

	const { data: history } = useQuery({
		queryKey: ['history', debounceValue],
		queryFn: () => {
			if (debounceValue.length >= 10) {
				return getHistory({
					phoneNumber: debounceValue,
				});
			}
		},
	});

	const createBookingMutate = useMutation({
		mutationKey: ['createBooking', phone, name, sourceAddress, targetAddress, type],
		mutationFn: (data) => createBooking(data),
		onSuccess: (data) => {
			console.log(data);
			toast.success('Chuyển tiếp thành công!');
			setName('');
			setPhone('');
			setSourceAddress('');
			setTargetAddress('');
			setSourceCoor('');
			setTargetCoor('');
		},
		onError: (err) => {
			console.log(err);
			toast.error('Something wrong. Please try again!');
		},
	});

	const handleChangePhone = (e) => {
		setPhone(e.target.value);
	};

	const handleChangeName = (e) => {
		setName(e.target.value);
	};

	const handleChangeSourceAddress = (e) => {
		setSourceAddress(e.target.value);
	};

	const handleChangeTargetAddress = (e) => {
		setTargetAddress(e.target.value);
	};

	const handleChangeType = (e) => {
		console.log(e.target.value);
		setType(e.target.value);
	};

	const handleClickNext = () => {
		console.log(phone, name, sourceAddress, targetAddress, type);
		if (phone != '' && name != '' && sourceAddress != '' && targetAddress != '' && type != '') {
			createBookingMutate.mutate({
				phoneNumber: phone,
				customerName: name,
				pickupAddress: sourceAddress,
				destAddress: targetAddress,
				time: new Date(),
				vehicleType: type,
			});
		} else {
			toast.warn('Please fill all the field!');
		}
	};

	const handleClickBook = () => {
		console.log(phone, name, sourceAddress, targetAddress);
		if (phone != '' && name != '' && sourceAddress != '' && targetAddress != '' && type != '') {
			sourceAddressMutation.mutate(sourceAddress);
		} else {
			toast.warn('Please fill all the field!');
		}
	};

	console.log(history);

	return (
		<>
			{/* Erorr Center CSS not working !  */}
			<Container style={{ marginTop: '100px', marginLeft: '80px', paddingBottom: '50px' }}>
				<Row>
					<Col md={6} className="rounded-2 pb-3" style={{ backgroundColor: '#ADC4CE' }}>
						<h1 className=" mb-4 mt-3">ĐẶT XE CHO KHÁCH</h1>
						<Form className="mx-2">
							<Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded w-auto"
								controlId="phoneNumber"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Số điện thoại
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Vui lòng điền SDT"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
									onChange={(e) => handleChangePhone(e)}
								/>
							</Form.Group>

							<Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded w-auto"
								controlId="fullname"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Họ và tên
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Vui lòng điền họ và tên đầy đủ"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
									onChange={(e) => handleChangeName(e)}
								/>
							</Form.Group>

							{/* <Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded"
								controlId="fullName"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Họ và tên
								</Form.Label>
								<Form.Control
									type="email"
									placeholder="+84 38 91 93 100"
									className="border-0 p-1 ml-1 w-auto"
									style={{ marginLeft: '12px', width: '99%' }}
								/>
							</Form.Group> */}

							<Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded w-auto"
								controlId="pickupAddress"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Địa chỉ đón
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Vui lòng điền địa chỉ đón"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
									onChange={(e) => handleChangeSourceAddress(e)}
								/>
							</Form.Group>

							{/* <Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded"
								controlId="pickupAddress"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Địa điểm đón
								</Form.Label>
								<Form.Control
									type="email"
									placeholder="+84 38 91 93 100"
									className="border-0 p-1 ml-1 w-auto"
									style={{ marginLeft: '12px', width: '99%' }}
								/>
							</Form.Group> */}

							<Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded w-auto"
								controlId="destinationAddress"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Địa chỉ đến
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Vui lòng điện địa chỉ đến"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
									onChange={(e) => handleChangeTargetAddress(e)}
								/>
							</Form.Group>

							{/* <Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded"
								controlId="destinationAddress"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Địa điểm đến
								</Form.Label>
								<Form.Control
									type="email"
									placeholder="+84 38 91 93 100"
									className="border-0 p-1 ml-1 w-auto"
									style={{ marginLeft: '12px', width: '99% !important' }}
								/>
							</Form.Group> */}

							<Form.Group
								className="bg-light rounded p-3 mb-3"
								style={{ paddingLeft: '12px' }}
							>
								<Form.Label className="fw-bold">Loại xe</Form.Label>
								<Form.Select
									aria-label="Default select example"
									onChange={(e) => handleChangeType(e)}
								>
									<option value="">Chọn loại xe</option>
									<option value="motorbike">Xe máy</option>
									<option value="car">Xe hơi</option>
								</Form.Select>
							</Form.Group>

							<Form.Group
								className="bg-light rounded p-3"
								style={{ paddingLeft: '12px' }}
							>
								<Form.Label className="fw-bold">Thiết lập thời gian</Form.Label>
								<Form.Select aria-label="Default select example">
									<option value="">Chọn thời gian thực hiện</option>
									<option value="now">Ngay bây giờ</option>
									<option value="1h">1h sau</option>
									<option value="2h">2h sau</option>
								</Form.Select>
							</Form.Group>

							<div className="mt-5 d-flex justify-content-between">
								<Button
									type="primary"
									danger
									icon={<ExportOutlined />}
									style={{ display: 'flex', alignItems: 'center' }}
									size="large"
									onClick={() => handleClickNext()}
								>
									Chuyển tiếp
								</Button>
								<Button
									type="primary"
									icon={<AimOutlined />}
									style={{ display: 'flex', alignItems: 'center' }}
									size="large"
									onClick={() => handleClickBook()}
								>
									Đặt xe
								</Button>
							</div>
						</Form>
					</Col>

					{/* Phần bên phải */}
					<Col md={5} style={{ marginLeft: '25px', width: '48%' }}>
						<h1 className="mb-4">LỊCH SỬ DI CHUYỂN</h1>
						{/* <Table striped bordered>
							<thead>
								<tr>
									<th>Số thứ tự</th>
									<th>Thời gian</th>
									<th>Địa điểm đón</th>
									<th>Địa điểm đến</th>
								</tr>
							</thead>
							<tbody>
								{fakeData.map((data) => (
									<tr key={data.id}>
										<td>{data.id}</td>
										<td>{data.time}</td>
										<td>{data.from}</td>
										<td>{data.to}</td>
									</tr>
								))}
							</tbody>
						</Table> */}
						<Table
							columns={columns}
							dataSource={history}
							pagination={{
								current: page,
								pageSize: 5,
								onChange: (page) => {
									setPage(page);
								},
							}}
							size="large"
							bordered
							className="columnTable"
						/>
					</Col>
				</Row>
			</Container>
			{/* Error-Center Not Working! */}
		</>
	);
}

export default Receive;
