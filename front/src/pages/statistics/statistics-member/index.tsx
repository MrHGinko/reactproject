import React, { useEffect } from 'react';
import { Modal, Button, Table, Input, Rate, message, Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList, setComment } from '../../../store/models/user';
import ShowTable from '../../../components/show-table';
import { getTaskList } from '../../../store/models/task';
import { ShowTaskModal } from '../show-task';

import './style.scss';

const { Option } = Select;
const InputGroup = Input.Group;

const StatisticsMember: React.FC<{}> = function StatisticsMember(this: any) {
	// 评价信息
	let comment = {
		task: '',
		text: '',
		score: 0,
		user: '',
	};

	const commentColumn = [
		{
			title: '订单号',
			dataIndex: 'task',
			key: 'task',
		},
		{
			title: '评价信息',
			dataIndex: 'text',
			key: 'text',
			width: 350,
			render: (text: any, record: any) => {
				let dom = null;
				if (!record.remark)
					dom = (
						<Input
							type='text'
							onChange={(ev) => {
								comment.text = ev.target.value;
							}}
							placeholder='请输入评价信息'></Input>
					);
				else dom = <span>{text}</span>;
				return dom;
			},
		},
		{
			title: '评价分数',
			dataIndex: 'score',
			key: 'score',
			render: (text: any, record: any) => {
				let dom = null;
				if (!record.remark)
					dom = (
						<Rate
							onChange={(ev) => {
								comment.score = ev;
							}}
						/>
					);
				else dom = <Rate defaultValue={text} disabled />;
				return dom;
			},
		},
		{
			title: '确认',
			dataIndex: 'confirm',
			key: 'confirm',
			render: (text: any, record: any) => {
				return (
					<Button
						type='primary'
						disabled={record.remark}
						onClick={requestComment.bind(this, record)}>
						{text ? '已评价' : '确认'}
					</Button>
				);
			},
		},
	];

	const requestComment = function(record: any) {
		if (comment.text === '' || comment.score === 0) {
			message.error('需要输入评价以及评分');
			return;
		}
		comment.task = record.task;
		setComment(comment);
		dispatch(getUserList());
		dispatch(getTaskList());
		Modal.destroyAll();
	};

	// comment
	const showCommentModal = function(data: any) {
		comment.user = data._id;
		const modal = Modal.info(data);

		modal.update({
			width: 1000,
			maskClosable: true,
			title: '您的评价',
			content: (
				<Table
					size='middle'
					rowKey={(data: any) => data._id}
					columns={commentColumn}
					dataSource={data.comment}></Table>
			),
			onOk() {
				modal.destroy();
			},
		});
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserList());
		dispatch(getTaskList());
	}, [dispatch]);

	const taskList = useSelector((state) => (state as any).getIn(['task', 'task']));

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
			title: '行程',
			dataIndex: 'task',
			key: 'task',
			render: (text: any, record: any) => {
				return (
					<div>
						<Button
							type='primary'
							onClick={ShowTaskModal.bind(this, record, taskList)}>
							查看
						</Button>
					</div>
				);
			},
		},
		{
			title: '评价',
			dataIndex: 'comment',
			key: 'comment',
			// antd中 text 与 record 获取其列值
			render: (text: any, record: any) => {
				return (
					<div>
						<Button type='primary' onClick={showCommentModal.bind(this, record)}>
							查看
						</Button>
					</div>
				);
			},
		},
		{
			title: '账号状态',
			dataIndex: 'status',
			key: 'status',
			width: 80,
			render: (text: any) => <span>{text ? '正在使用' : '被禁用'}</span>,
		},
	];

	// 注意: state返回的是index下的reducer, user是子模块, 因此这里需要两层user获取到user仓库下的user(数据)
	let userList = useSelector((state) => (state as any).getIn(['user', 'user']));
	const status = useSelector((state) => (state as any).getIn(['user', 'status']));

	return (
		<div id='statistics-member'>
			<Form layout='inline'>
				<Form.Item label='手机号码'>
					<Input placeholder='' />
				</Form.Item>

				<Form.Item label='账号状态'>
					<Select defaultValue='全部' style={{ width: 120 }} /*nChange={handleChange}*/>
						<Option value='全部'>全部</Option>
						<Option value='正常'>正常</Option>
						<Option value='关闭'>关闭</Option>
					</Select>
				</Form.Item>
				<Form.Item label='呼叫次数: '>
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

				<Form.Item label='消费金额: '>
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
			<ShowTable status={status} columns={columns} data={userList} />
		</div>
	);
};

export default StatisticsMember;
