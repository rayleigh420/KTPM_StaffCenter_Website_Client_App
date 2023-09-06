import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Map from './Map';
import { QueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function DetailLocate() {
	const { id } = useParams();

	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');

	useEffect(() => {
		console.log('firsHelt');
		const queryClient = new QueryClient();
		const data = queryClient.getQueryData(['waiting']);
		console.log(data);
	}, []);

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
									// value={}
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
									type="text"
									placeholder="Nguyễn Văn Nam"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
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
									placeholder="Số 5 Đồ Sơn, phường 04, quận Tân Bình"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
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
									placeholder="227 Nguyễn Văn Cừ, phường 04, quận 05"
									className="border-0 p-1 ml-1"
									style={{ marginLeft: '12px', width: '99%' }}
								/>
							</Form.Group>

							<Container
								className="mt-5"
								style={{ display: 'flex', justifyContent: 'center' }}
							>
								<Button variant="warning">Check</Button>
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
		</>
	);
}
