import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Map from './Map';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { bookDirect, getDetailBookingPosition } from '../../apis/bookAPI';
import { getCoordinates } from '../../apis/mapAPI';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

export default function DetailLocate() {
	const { id } = useParams();

	// const [phone, setPhone] = useState('');
	// const [name, setName] = useState('');
	// const [start, setStart] = useState('');
	// const [end, setEnd] = useState('');

	const [modal, setModal] = useState(false);

	const [sourceCoor, setSourceCoor] = useState({});
	const [targetCoor, setTargetCoor] = useState({});

	const {
		data: detail,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['detail', 'waiting', id],
		queryFn: () => getDetailBookingPosition(id),
	});

	// useEffect(() => {
	// 	if (detail) {
	// 		setPhone(detail.phoneNumber);
	// 		setName(detail.customerName);
	// 		setStart(detail.pickupAddress);
	// 		setEnd(detail.destAddress);
	// 	}
	// }, [detail]);

	const sourceAddressMutation = useMutation({
		mutationKey: ['coordinate', detail?.pickupAddress],
		mutationFn: (sourceAddress) => getCoordinates(sourceAddress),
		onSuccess: (data) => {
			console.log('Source: ', data);
			setSourceCoor(data);
			targetAddressMutation.mutate(detail?.destAddress);
		},
		onError: (err) => {
			console.log(err);
			toast.error('Something wrong. Please try again!');
		},
	});

	const targetAddressMutation = useMutation({
		mutationKey: ['coordinate', detail?.destAddress],
		mutationFn: (targetAddress) => getCoordinates(targetAddress),
		onSuccess: (data) => {
			console.log('Target: ', data);
			setTargetCoor(data);
			setModal(true);
		},
		onError: (err) => {
			console.log(err);
			toast.error('Something wrong. Please try again!');
		},
	});

	// console.log(detail);
	const checkMap = () => {
		sourceAddressMutation.mutate(detail?.pickupAddress);
	};

	const bookDirectMutation = useMutation({
		mutationKey: ['book', detail?.phoneNumber, detail?.customerName, sourceCoor, targetCoor],
		mutationFn: (info) => bookDirect(info),
		onSuccess: (data) => {
			console.log(data);
			toast.success('Booking success!');
		},
		onError: (err) => {
			console.log(err);
			toast.error('Something wrong. Please try again!');
		},
	});

	return (
		<>
			<Container style={{ marginTop: '120px' }}>
				<Row>
					<Col>
						<Form
							className="mx-2"
							style={{
								width: '30rem',
							}}
						>
							<Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded w-auto"
								controlId="phoneNumber"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Số điện thoại
								</Form.Label>
								<Form.Control
									value={detail?.phoneNumber}
									type="text"
									placeholder="+84 38 91 93 100"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
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
									value={detail?.customerName}
									type="text"
									placeholder="Nguyễn Văn Nam"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
								/>
							</Form.Group>

							<Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded w-auto"
								controlId="pickupAddress"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Địa chỉ đón
								</Form.Label>
								<Form.Control
									value={detail?.pickupAddress}
									type="text"
									placeholder="Số 5 Đồ Sơn, phường 04, quận Tân Bình"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
								/>
							</Form.Group>

							<Form.Group
								className="p-2 mb-3 border-1  pb-2 bg-light rounded w-auto"
								controlId="destinationAddress"
							>
								<Form.Label className="fw-bold" style={{ marginLeft: '12px' }}>
									Địa chỉ đến
								</Form.Label>
								<Form.Control
									value={detail?.destAddress}
									type="text"
									placeholder="227 Nguyễn Văn Cừ, phường 04, quận 05"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
								/>
							</Form.Group>

							<Container
								className="mt-5"
								style={{ display: 'flex', justifyContent: 'center' }}
							>
								<Button variant="warning" onClick={() => checkMap()}>
									Check
								</Button>
							</Container>
						</Form>
					</Col>

					<Col>
						<div>
							<h1>SHOW MAP</h1>
						</div>

						<Map />
					</Col>
				</Row>
			</Container>
			<Modal
				title="Verify information"
				open={modal}
				onCancel={() => setModal(false)}
				footer={[
					<Button
						key="Book"
						onClick={() =>
							bookDirectMutation.mutate({
								phoneNumber: detail?.phoneNumber,
								pickup: sourceCoor,
								destination: targetCoor,
								price: '100000',
								vehicleType: 'motorbike',
								paymentMethod: 'cash',
							})
						}
					>
						Book
					</Button>,
				]}
			>
				<p>Check success! Please booking!</p>
			</Modal>
		</>
	);
}
