import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDriverList } from '../../../store/models/driver';
import ShowTable from '../../../components/show-table';
import { Button } from 'antd';
import { getTaskList } from '../../../store/models/task';
import {ShowTaskModal} from '../show-task'

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
			<ShowTable status={status} columns={columns} data={driverList} />
		</div>
	);
};

export default StatisticsCar;
