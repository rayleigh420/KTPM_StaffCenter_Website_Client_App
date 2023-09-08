import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaClock, FaCheckDouble, FaCheckSquare, FaRss, FaTimesCircle } from 'react-icons/fa';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './Status.css';
import { useQuery } from '@tanstack/react-query';
import { getAllStatus } from '../../apis/bookAPI';

export default function Status() {
	const [data, setData] = useState([
		{ id: 1, time: '08:00 AM', phoneNumber: '+84 123 456 789', status: 'Hủy bỏ' },
		{ id: 2, time: '11:30 AM', phoneNumber: '+84 987 654 321', status: 'Hoàn thành' },
		{ id: 3, time: '02:45 PM', phoneNumber: '+84 555 555 555', status: 'Đang tiến hành' },
		{ id: 4, time: '05:15 PM', phoneNumber: '+84 888 888 888', status: 'Đang tiến hành' },
		{ id: 5, time: '09:30 PM', phoneNumber: '+84 111 222 333', status: 'Hoàn thành' },
	]);

	const { data: status } = useQuery({
		queryKey: ['status'],
		queryFn: () => getAllStatus(),
	});

	const statusVariants = {
		'Hủy bỏ': 'danger',
		'Hoàn thành': 'success',
		'Đang tiến hành': 'warning',
	};

	console.log(status);
	return (
		<>
			<Container className="text-center" style={{ marginTop: '80px' }}>
				<Row>
					<Col>
						<Card
							border="success"
							bg="success"
							style={{ width: 'max-content' }}
							className="card"
						>
							<FaCheckSquare className="spin-icon mx-2" size={30} />
							<Card.Body>
								<Card.Title>Hoàn thành</Card.Title>
								<Card.Text>213 lượt</Card.Text>
							</Card.Body>
						</Card>
					</Col>

					<Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Card
							border="warning"
							bg="warning"
							style={{
								width: 'max-content',
								display: 'flex',
								justifyContent: 'flex-end',
							}}
							className="card "
						>
							<FaRss className="spin-icon mx-2" size={30} />
							<Card.Body>
								<Card.Title>Đang tiến hành</Card.Title>
								<Card.Text>03 lượt</Card.Text>
							</Card.Body>
						</Card>
					</Col>

					<Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Card
							border="danger"
							bg="danger"
							style={{
								width: 'max-content',
								display: 'flex',
								justifyContent: 'flex-end',
							}}
							className="card"
						>
							<FaTimesCircle className="spin-icon mx-2" size={30} />
							<Card.Body>
								<Card.Title>Hủy bỏ</Card.Title>
								<Card.Text>05 lượt</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				<Row className="mt-4">
					<Col>
						<Table bordered hover>
							<thead>
								<tr>
									<th className="bg-gray">STT</th>
									<th className="bg-gray">Thời gian</th>
									<th className="bg-gray">Khách hàng</th>
									<th className="bg-gray">Trạng thái</th>
								</tr>
							</thead>
							<tbody>
								{status &&
									status?.map((item) => (
										<tr key={item?.id} className="align-center">
											<td>{item?.id}</td>
											<td>{item?.time}</td>
											<td>{item?.phoneNumber}</td>
											<td>
												<Button
													variant={statusVariants[item?.status]}
													size="sm"
												>
													{item?.status}
												</Button>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</>
	);
}
