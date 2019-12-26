import { Table, Modal } from 'antd';
import React from 'react';

const taskColumn = [
	{
		title: '订单号码',
		dataIndex: '_id',
		key: '_id',
	},
	{
		title: '车牌号码',
		dataIndex: 'carNumber',
		key: 'carNumber',
	},
	{
		title: '司机姓名',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '始发地',
		dataIndex: 'start',
		key: 'start',
	},
	{
		title: '目的地',
		dataIndex: 'end',
		key: 'end',
	},
	{
		title: '发车时间',
		dataIndex: 'departureTime',
		key: 'departureTime',
	},
	{
		title: '到达时间',
		dataIndex: 'arrivalTime',
		key: 'arrivalTime',
		render: (text: any) => <span>{text ? text : '未到达'}</span>,
	},
	{
		title: '支付金额',
		dataIndex: 'payout',
		key: 'payout',
	},
	{
		title: '评价状态',
		dataIndex: 'remark',
		key: 'remark',
		render: (text: any, record: any) => (<span>{ record.remark ? '已评价' : '未评价'}</span>)
	},
	{
		title: '订单状态',
		dataIndex: 'status',
		key: 'status',
	},
];

export const ShowTaskModal = function(...rest: any[]) {
	const [task, taskList] = rest;
	const data: any = [];

	taskList.forEach((item: any) => {
		task.taskList.forEach((id: string) => {
			if (id === item._id) {
				data.push(item);
			}
		});
	});

	console.log('showtask data: ', data);

	data.map((item: any) => {
		item.name = task.name;
	});

	const modal = Modal.info(data);
	modal.update({
		width: 1400,
		maskClosable: true,
		title: '运单信息',
		content: <Table rowKey={(data: any) => data._id} columns={taskColumn} dataSource={data}></Table>,
		okText: '关闭',
		okType: 'default',
		onOk() {
			modal.destroy();
		},
	});
};
