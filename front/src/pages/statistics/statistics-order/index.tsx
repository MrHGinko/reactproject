import React, { useEffect, memo } from 'react';
import { Modal, Button, Table, Popover, Form, Input, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskList, setArrivalTime } from '../../../store/models/task';
import ShowTable from '../../../components/show-table';

import './style.scss';

const { RangePicker } = DatePicker;

const peopleColumn = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '身份证号',
		dataIndex: 'ID',
		key: 'ID',
	},
	{
		title: '手机',
		dataIndex: 'tel',
		key: 'tel',
	},
];

const StatisticsOrder: React.FC<{}> = memo(function StatisticsOrder(this: any) {
	const columns = [
		{
			title: '订单号码',
			dataIndex: '_id',
			key: '_id',
			width: 200,
		},
		{
			title: '订单状态',
			dataIndex: 'status',
			key: 'status',
			width: 80,
		},
		{
			title: '下单时间',
			dataIndex: 'createTime',
			key: 'createTime',
			width: 150,
		},
		{
			title: '发车时间',
			dataIndex: 'departureTime',
			key: 'departureTime',
			width: 150,
		},
		{
			title: '到达时间',
			dataIndex: 'arrivalTime',
			key: 'arrivalTime',
			width: 150,
			render: (text: any, record: any) => {
				if (text) {
					return <span>{text}</span>;
				} else {
					return (
						<Popover
							placement='right'
							content='点击更改到达状态, 并以当前时间作为到达时间'>
							<Button type='primary' onClick={timeModal.bind(this, record)}>
								到达
							</Button>
						</Popover>
					);
				}
			},
		},
		{
			title: '始发地',
			dataIndex: 'start',
			key: 'start',
			width: 80,
		},
		{
			title: '目的地',
			dataIndex: 'end',
			key: 'end',
			width: 80,
		},
		{
			title: '司机电话',
			dataIndex: 'driverTel',
			key: 'driverTel',
			width: 120,
		},
		{
			title: '会员手机',
			dataIndex: 'userTel',
			key: 'userTel',
			width: 120,
		},
		{
			title: '支付方式',
			dataIndex: 'payway',
			key: 'payway',
			width: 80,
		},
		{
			title: '支付金额',
			dataIndex: 'payout',
			key: 'payout',
			width: 80,
		},
		{
			title: '评价状态',
			dataIndex: 'remark',
			key: 'remark',
			width: 100,
			render: (text: any, record: any) => {
				return <span>{text ? '已评价' : '未评价'}</span>;
			},
		},
		{
			title: '乘客信息',
			dataIndex: 'personInfo',
			key: 'personInfo',
			fixed: 'right',
			width: 80,
			render: (text: any, record: any) => {
				return (
					<div>
						<Button
							type='primary'
							onClick={showPersonInfoModal.bind(this, record.peopleInfo)}>
							查看
						</Button>
					</div>
				);
			},
		},
	];

	const timeModal = function(data: any) {
		const modal = Modal.confirm(data);

		modal.update({
			maskClosable: true,
			title: '设置到达时间',
			width: 600,
			content: (
				<p>
					<span> {new Date().toLocaleString()} </span>
					已到达, 并以当前时间作为到达时间.
				</p>
			),
			onOk() {
				setArrivalTime(data._id, new Date().toLocaleString());
				dispatch(getTaskList());
				modal.destroy();
			},
			onCancel() {
				modal.destroy();
			},
		});
	};

	const showPersonInfoModal = function(data: any) {
		const modal = Modal.info(data);

		modal.update({
			maskClosable: true,
			title: '乘客信息',
			width: 600,
			content: (
				<Table
					rowKey={(data: any) => data._id}
					columns={peopleColumn}
					dataSource={data}
					size={'middle'}></Table>
			),
			onOk() {
				modal.destroy();
			},
		});
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTaskList());
	}, [dispatch]);

	// 注意: state返回的是index下的reducer, user是子模块, 因此这里需要两层user获取到user仓库下的user(数据)
	let taskList = useSelector((state) => (state as any).getIn(['task', 'task']));
	const status = useSelector((state) => (state as any).getIn(['task', 'status']));

	function onChange(value: any, dateString: any) {
		console.log('Selected Time: ', value);
		console.log('Formatted Selected Time: ', dateString);
	}

	function onOk(value: any) {
		console.log('onOk: ', value);
	}

	return (
		<div id='statistics-order'>
			<Form layout='inline'>
				<Form.Item label='车牌号码'>
					<Input placeholder='' />
				</Form.Item>
				<Form.Item label='发车时间'>
					<RangePicker
						showTime={{ format: 'HH:mm' }}
						format='YYYY-MM-DD HH:mm'
						placeholder={['Start Time', 'End Time']}
						onChange={onChange}
						onOk={onOk}
					/>
				</Form.Item>
				<Form.Item label='下单时间'>
					<RangePicker
						showTime={{ format: 'HH:mm' }}
						format='YYYY-MM-DD HH:mm'
						placeholder={['Start Time', 'End Time']}
						onChange={onChange}
						onOk={onOk}
					/>
				</Form.Item>
				<Form.Item label='始发地'>
					<Input placeholder='' />
				</Form.Item>
				<Form.Item label='目的地'>
					<Input placeholder='' />
				</Form.Item>
				<Form.Item label='会员手机'>
					<Input placeholder='' />
				</Form.Item>
				<Form.Item label='司机姓名'>
					<Input placeholder='' />
				</Form.Item>
				<Form.Item label='司机电话'>
					<Input placeholder='' />
				</Form.Item>
				<Form.Item label='支付方式'>
					<Input placeholder='' />
				</Form.Item>
				<Form.Item>
					<Button type='primary'>Submit</Button>
				</Form.Item>
			</Form>
			<ShowTable status={status} columns={columns} data={taskList} />
		</div>
	);
});

export default StatisticsOrder;
