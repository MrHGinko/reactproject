import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../../store/models/user';
import ShowTable from '../../../components/show-table'

import './style.scss'

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
	},
];
const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},{
		key: '2',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
];

const StatisticsMember: React.FC<{}> = function StatisticsMember() {
	const dispatch = useDispatch();

	// 注意: state返回的是index下的reducer, user是子模块, 因此这里需要两层user获取到user仓库下的user(数据)
	const userList = useSelector((state) => (state as any).getIn(['user', 'user']));
	const status = useSelector((state) => (state as any).getIn(['user', 'status']));

	useEffect(() => {
		dispatch(getUserList());
	}, [dispatch]);

	return (
		<div id='statistics-member'>
			<ShowTable status={status} columns={columns} data={data} />
		</div>
	);
};

export default StatisticsMember;
