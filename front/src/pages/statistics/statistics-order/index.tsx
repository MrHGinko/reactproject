import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskList } from '../../../store/models/task';
import ShowTable from '../../../components/show-table';

import './style.scss';

const columns = [
	{
		title: '订单号码',
		dataIndex: '_id',
		key: '_id',
		width: 200
	},{
		title: '订单状态',
		dataIndex: 'status',
		key: 'status',
		width: 80
	},{
		title: '下单时间',
		dataIndex: 'createTime',
		key: 'createTime',
		width: 150
	},{
		title: '发车时间',
		dataIndex: 'departureTime',
		key: 'departureTime',
		width: 150
	},{
		title: '到达时间',
		dataIndex: 'arrivalTime',
		key: 'arrivalTime',
		width: 80,
		render: () => <a>编辑</a>
	},{
		title: '始发地',
		dataIndex: 'start',
		key: 'start',
		width: 80,
	},{
		title: '目的地',
		dataIndex: 'end',
		key: 'end',
		width: 80,
	},{
		title: '司机电话',
		dataIndex: 'driverTel',
		key: 'driverTel',
		width: 120
	},{
		title: '会员手机',
		dataIndex: 'userTel',
		key: 'userTel',
		width: 120,
	},{
		title: '支付方式',
		dataIndex: 'payway',
		key: 'payway',
		width: 80,
	},{
		title: '支付金额',
		dataIndex: 'payout',
		key: 'payout',
		width: 80,
	},{
		title: '评价状态',
		dataIndex: 'remark',
		key: 'remark',
		width: 100,
	},{
		title: '乘客信息',
		dataIndex: 'personInfo',
		key: 'personInfo',
		fixed:'right',
		width: 80,
		render: () => <a>查看</a>
	},
];

const StatisticsOrder: React.FC<{}> = function StatisticsOrder() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTaskList());
	}, [dispatch]);

	// 注意: state返回的是index下的reducer, user是子模块, 因此这里需要两层user获取到user仓库下的user(数据)
	let taskList = useSelector((state) => (state as any).getIn(['task', 'task']));
	const status = useSelector((state) => (state as any).getIn(['task', 'status']));
	console.log(taskList)

	return (
		<div id='statistics-member'>
			<ShowTable status={status} columns={columns} data={taskList} />
		</div>
	);
};

export default StatisticsOrder;
