import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDriverList } from '../../../store/models/driver';
import ShowTable from '../../../components/show-table';
import { Button, Form, Input, Select } from 'antd';
import { getTaskList } from '../../../store/models/task';
import { ShowTaskModal } from '../show-task';

const InputGroup = Input.Group;
const { Option } = Select;

const StatisticsCar: React.FC<{}> = function StatisticsCar(this: any) {
	const dispatch = useDispatch();

	//const [taskList, setTaskList] = useState(useSelector((state) => (state as any).getIn(['task', 'task'])));

	useEffect(() => {
		dispatch(getDriverList());
		dispatch(getTaskList());
	}, [dispatch]);

	const taskList = useSelector((state) => (state as any).getIn(['task', 'task']));

	const columns = [
		{
			title: '车牌号码',
			dataIndex: 'carNumber',
			key: 'carNumber',
		},
		{
			title: '车辆类型',
			dataIndex: 'carType',
			key: 'carType',
		},
		{
			title: '座位数',
			dataIndex: 'carSeat',
			key: 'carSeat',
		},
		{
			title: '司机姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '司机电话',
			dataIndex: 'tel',
			key: 'tel',
		},
		{
			title: '司机状态',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: '运单总金额',
			dataIndex: 'allPrice',
			key: 'allPrice',
		},
		{
			title: '运单详情',
			dataIndex: 'taskList',
			key: 'taskList',
			render: (text: any, record: any) => {
				return (
					<Button type='primary' onClick={ShowTaskModal.bind(this, record, taskList)}>
						查看
					</Button>
				);
			},
		},
	];

	// 注意: state返回的是index下的reducer, user是子模块, 因此这里需要两层user获取到user仓库下的user(数据)
	let driverList = useSelector((state) => (state as any).getIn(['driver', 'driver']));
	const status = useSelector((state) => (state as any).getIn(['driver', 'status']));

	return (
		<div id='statistics-car'>
			<Form layout='inline'>
				<Form.Item label='车牌号'>
					<Input placeholder='' />
				</Form.Item>

				<Form.Item label='账号状态'>
					<Select defaultValue='全部' style={{ width: 120 }} /*nChange={handleChange}*/>
						<Option value='全部'>全部</Option>
						<Option value='正常'>正常</Option>
						<Option value='关闭'>关闭</Option>
					</Select>
				</Form.Item>
				<Form.Item label='接单次数: '>
					<InputGroup compact style={{ display: 'inline-block', width: 'auto' }}>
						<Input
							style={{
								width: 100,
								textAlign: 'center',
								borderRadius: '4px 0 0 4px',
							}}
							placeholder='Minimum'
						/>

						<Input
							style={{
								width: 32,
								pointerEvents: 'none',
								backgroundColor: '#fff',
								textAlign: 'center',
							}}
							placeholder='~'
							disabled
						/>
						<Input
							style={{ width: 100, textAlign: 'center' }}
							placeholder='Maximum'
						/>
					</InputGroup>
				</Form.Item>

				<Form.Item label='运单总金额: '>
					<InputGroup compact style={{ display: 'inline-block', width: 'auto' }}>
						<Input
							style={{
								width: 100,
								textAlign: 'center',
								borderRadius: '4px 0 0 4px',
							}}
							placeholder='Minimum'
						/>

						<Input
							style={{
								width: 32,
								pointerEvents: 'none',
								backgroundColor: '#fff',
								textAlign: 'center',
							}}
							placeholder='~'
							disabled
						/>
						<Input
							style={{ width: 100, textAlign: 'center' }}
							placeholder='Maximum'
						/>
					</InputGroup>
				</Form.Item>
				<Form.Item>
					<Button type='primary'>查询</Button>
				</Form.Item>
			</Form>
			<ShowTable status={status} columns={columns} data={driverList} />
		</div>
	);
};

export default StatisticsCar;
