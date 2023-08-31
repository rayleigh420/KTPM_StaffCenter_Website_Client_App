import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './style.css';
import { Button, Space } from 'antd';
import { AimOutlined, ExportOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';

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
const data = [
	{
		stt: '1',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	{
		stt: '2',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	{
		stt: '3',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	{
		stt: '4',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	,
	{
		stt: '2',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	{
		stt: '3',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	{
		stt: '4',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	,
	{
		stt: '2',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	{
		stt: '3',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	{
		stt: '4',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	,
	{
		stt: '2',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	{
		stt: '3',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
	{
		stt: '4',
		time: '18/08/2023',
		pickupAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
		destinationAddress: 'So 5 Do Son street, 4 ward, Tan Binh district',
	},
];

function Receive() {
	const [bottom, setBottom] = useState('bottomRight');
	const [page, setPage] = useState(1);

	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [sourceAddress, setSourceAddress] = useState('');
	const [targetAddress, setTargetAddress] = useState('');

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

	const handleClickNext = () => {
		console.log(phone, name, sourceAddress, targetAddress);
	};

	const handleClickBook = () => {
		console.log(phone, name, sourceAddress, targetAddress);
	};
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
									placeholder="+84 38 91 93 100"
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
									placeholder="Nguyễn Văn Nam"
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
									placeholder="Số 5 Đồ Sơn, phường 04, quận Tân Bình"
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
									placeholder="227 Nguyễn Văn Cừ, phường 04, quận 05"
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
								className="bg-light rounded p-3"
								style={{ paddingLeft: '12px' }}
							>
								<Form.Label className="fw-bold">Loại xe</Form.Label>
								<Form.Check type="radio" label="Xe máy" name="carType" />
								<Form.Check type="radio" label="Xe 4 chỗ" name="carType" />
								<Form.Check type="radio" label="Xe 7 chỗ" name="carType" />
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
							dataSource={data}
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
