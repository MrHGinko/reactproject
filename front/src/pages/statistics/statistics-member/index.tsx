import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../../store/models/user';
import ShowTable from '../../../components/show-table';

import './style.scss';

const StatisticsMember: React.FC<{}> = memo(function StatisticsMember() {
	const columns = [
		{
			title: '手机号码',
			dataIndex: 'tel',
			key: 'tel',
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '呼叫次数',
			dataIndex: 'callCount',
			key: 'callCount',
		},
		{
			title: '消费金额',
			dataIndex: 'allPrice',
			key: 'allPrice',
		},
		{
			title: '账号状态',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: '行程',
			dataIndex: 'task',
			key: 'task',
			render: (text: any, record: any) => {
				//console.log('text: ', text, 'record: ', record);
				return <a onClick={()=>{console.log(record)}}>查看</a>;
			},
		},
		{
			title: '评价',
			dataIndex: 'comment',
			key: 'comment',
			// antd中 text 与 record 获取其列值
			render: (text: any, record: any) => <a onClick={()=>{console.log(record.comment)}}>查看</a>,
		},
	];

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserList());
	}, [dispatch]);

	// 注意: state返回的是index下的reducer, user是子模块, 因此这里需要两层user获取到user仓库下的user(数据)
	let userList = useSelector((state) => (state as any).getIn(['user', 'user']));
	const status = useSelector((state) => (state as any).getIn(['user', 'status']));
	console.log(userList);
	userList.map((item: any) => {});
	return (
		<div id='statistics-member'>
			<ShowTable status={status} columns={columns} data={userList} />
		</div>
	);
});

export default StatisticsMember;
