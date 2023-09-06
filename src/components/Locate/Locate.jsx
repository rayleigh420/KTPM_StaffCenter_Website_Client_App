import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaClock, FaCheckDouble } from 'react-icons/fa';
import './style.css';
// import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Space } from 'antd';
import { AimOutlined, ExportOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAllWaiting } from '../../apis/bookAPI';

const columns = [
	{
		title: 'STT',
		dataIndex: 'stt',
		key: 'stt',
		render: (text) => <a>{text}</a>,
		textAlign: 'center',
	},
	{
		title: 'Thời gian',
		dataIndex: 'time',
		key: 'time',
	},
	{
		title: 'Khách hàng',
		dataIndex: 'phoneNumber',
		key: 'phoneNumber',
	},
	{
		title: 'Tình trạng',
		dataIndex: 'status',
		status: 'status',
	},
];
const data = [
	{
		stt: '1',
		time: '9:00 AM - 18/08/2023',
		phoneNumber: '+84 38 91 93 100',
		status: (
			<Button type="primary" href="http://localhost:5173/detailLocate">
				Kiểm tra
			</Button>
		),
	},
	{
		stt: '2',
		time: '9:00 AM - 18/08/2023',
		phoneNumber: '+84 38 91 93 100',
		status: (
			<Button type="primary" href="http://localhost:5173/detailLocate">
				Kiểm tra
			</Button>
		),
	},
	{
		stt: '3',
		time: '9:00 AM - 18/08/2023',
		phoneNumber: '+84 38 91 93 100',
		status: (
			<Button type="primary" href="http://localhost:5173/detailLocate">
				Kiểm tra
			</Button>
		),
	},
	{
		stt: '4',
		time: '9:00 AM - 18/08/2023',
		phoneNumber: '+84 38 91 93 100',
		status: (
			<Button type="primary" href="http://localhost:5173/detailLocate">
				Kiểm tra
			</Button>
		),
	},
];

export default function Locate() {
	// const [data, setData] = useState([
	// 	{ id: 1, time: '08:00 AM', phoneNumber: '+84 123 456 789', check: 'Kiểm tra' },
	// 	{ id: 2, time: '11:30 AM', phoneNumber: '+84 987 654 321', check: 'Kiểm tra' },
	// 	{ id: 3, time: '02:45 PM', phoneNumber: '+84 555 555 555', check: 'Kiểm tra' },
	// 	{ id: 4, time: '05:15 PM', phoneNumber: '+84 888 888 888', check: 'Kiểm tra' },
	// 	{ id: 5, time: '09:30 PM', phoneNumber: '+84 111 222 333', check: 'Kiểm tra' },
	// ]);

	// const [bottom, setBottom] = useState('bottomRight');
	const [page, setPage] = useState(1);

	const {
		data: waitingList,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['waiting'],
		queryFn: () => getAllWaiting(),
	});

	console.log(waitingList);

	return (
		<>
			<Container className="text-center" style={{ marginTop: '100px' }}>
				<Row>
					<Col>
						<Card
							border="danger"
							bg="danger"
							style={{ width: 'max-content' }}
							className="card"
						>
							<FaClock className="spin-icon mx-2" size={30} />
							<Card.Body>
								<Card.Title>Chờ định vị</Card.Title>
								<Card.Text>1000 lượt</Card.Text>
							</Card.Body>
						</Card>
					</Col>

					<Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Card
							border="success"
							bg="success"
							style={{
								width: 'max-content',
								display: 'flex',
								justifyContent: 'flex-end',
							}}
							className="card"
						>
							<FaCheckDouble className="spin-icon mx-2" size={30} />
							<Card.Body>
								<Card.Title>Định vị thành công</Card.Title>
								<Card.Text>712 lượt</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				<Row className="mt-4 text-center">
					<Col>
						{/* <Table striped bordered hover>
							<thead>
								<tr>
									<th>STT</th>
									<th>Thời gian</th>
									<th>Khách hàng</th>
									<th>Tiến hành</th>
								</tr>
							</thead>
							<tbody>
								{data.map((row) => (
									<tr key={row.id} className="align-center">
										<td>{row.id}</td>
										<td>{row.time}</td>
										<td>{row.phoneNumber}</td>
										<td>
											<Button variant="primary">{row.check}</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table> */}

						<Table
							columns={columns}
							dataSource={waitingList}
							pagination={{
								current: page,
								pageSize: 5,
								onChange: (page) => {
									setPage(page);
								},
							}}
							size="medium"
							bordered
							className="columnTable"
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
}
