import React, { useState, useCallback, useEffect, memo } from 'react';
import { Button, Form, Input, message, AutoComplete, Icon, DatePicker } from 'antd';
import { addTask } from '../../../store/models/task';

import EventBus from '../../../utils/EventBus';

import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../../store/models/user';
import { getDriverList } from '../../../store/models/driver';

import './style.scss';

let id = 1;

const PeopleForm: React.FC<{}> = memo(function PeopleForm(props: any) {
	const { form } = props;

	form.getFieldDecorator('keys', { initialValue: [0] });
	const keys = form.getFieldValue('keys');

	function add() {
		const { form } = props;

		const keys = form.getFieldValue('keys');

		const nextKeys = keys.concat(id++);

		form.setFieldsValue({
			keys: nextKeys,
		});
	}

	function remove(k: any) {
		console.log(k);
		const { form } = props;
		// can use data-binding to get
		const keys = form.getFieldValue('keys');
		// We need at least one passenger
		if (keys.length === 1) {
			return;
		}

		// can use data-binding to set
		form.setFieldsValue({
			keys: keys.filter((key: any) => key !== k),
		});
	}

	const formItems = keys.map((k: any) => (
		<Form.Item key={k}>
			{form.getFieldDecorator(`info[${k}]name`, {
				validateTrigger: ['onChange', 'onBlur'],
				rules: [
					{
						required: true,
						whitespace: true,
						message: '需要完成输入',
					},
				],
			})(<Input placeholder='姓名' style={{ width: '90%', marginRight: 8 }} />)}

			{form.getFieldDecorator(`info[${k}]tel`, {
				validateTrigger: ['onChange', 'onBlur'],
				rules: [
					{
						required: true,
						whitespace: true,
						message: '需要输入电话',
					},
				],
			})(<Input placeholder='电话' style={{ width: '90%', marginRight: 8 }} />)}

			{form.getFieldDecorator(`info[${k}]ID`, {
				validateTrigger: ['onChange', 'onBlur'],
				rules: [
					{
						required: true,
						whitespace: true,
						message: '需要输入身份证',
					},
				],
			})(<Input placeholder='身份证号' style={{ width: '90%', marginRight: 8 }} />)}

			{keys.length > 1 ? (
				<Icon
					className='dynamic-delete-button'
					type='minus-circle-o'
					onClick={() => {
						remove(k);
					}}
				/>
			) : null}
		</Form.Item>
	));

	const handleSubmit = (e: any) => {
		e.preventDefault();
		form.validateFields((err: any, values: any) => {
			if (!err) {
				EventBus.emit('PeopleInfo', values.info);
			}
		});
	};

	return (
		<Form>
			<Form.Item label='乘车用户信息'>
				{formItems}
				<Button type='dashed' onClick={add} style={{ width: '100%' }}>
					<Icon type='plus' /> 添加一名乘车人
				</Button>
			</Form.Item>
			<Button type='primary' onClick={handleSubmit}>
				确认
			</Button>
		</Form>
	);
});

const PeopleInfoForm = Form.create({ name: 'get_peopleInfo' })(PeopleForm);

const PlanDeparture = memo(function PlanDeparture(this: any) {
	const [userTel, setUserTel] = useState('');
	const [driverTel, setDriverTel] = useState('');
	const [peopleInfo, setPeopleInfo] = useState([]);

	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');

	const [departureTime, setDepartureTime] = useState('');
	const [payout, setPayout] = useState(0);
	const [payway, setPayway] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		EventBus.addListener('PeopleInfo', (value) => {
			setPeopleInfo(value);
		});
		return () => {
			EventBus.removeAllListeners();
		};
	}, []);

	useEffect(() => {
		dispatch(getDriverList());
		dispatch(getUserList());
	}, [dispatch]);

	const driverList = useSelector((state) => (state as any).getIn(['driver', 'driver']));
	const userList = useSelector((state) => (state as any).getIn(['user', 'user']));

	const userSource = userList.map((item: any) => {
		return item.tel;
	});

	const driverSource = driverList.map((item: any) => {
		return item.tel;
	});

	function onUserSelect(value: any) {
		setUserTel(value);
	}

	function onDriverSelect(value: any) {
		setDriverTel(value);
	}

	const changeStart = useCallback(
		(e: any) => {
			setStart(e.target.value);
		},
		[start],
	);

	const changeEnd = useCallback(
		(e: any) => {
			setEnd(e.target.value);
		},
		[end],
	);

	const changePayout = useCallback(
		(e: any) => {
			setPayout(e.target.value);
		},
		[payout],
	);

	const changePayway = useCallback(
		(e: any) => {
			setPayway(e.target.value);
		},
		[payway],
	);

	const onOk = useCallback(
		(value: any) => {
			setDepartureTime(new Date(value).toLocaleString());
		},
		[departureTime],
	);

	const toAddTask = async function() {
		const info = {
			userTel,
			driverTel,
			peopleInfo,
			peopleNumber: peopleInfo.length,
			start,
			end,
			departureTime,
			payout,
			payway,
		};

		console.log(info);

		let result = await addTask((info as any));
		if (result.code === 0 && result.message === 'ok') {
			message.success('添加成功');
		} else {
			message.error('添加失败');
		}
	};

	return (
		<div className='user'>
			<div className='user-l'>
				<Form>
					<Form.Item label='用户电话'>
						<AutoComplete
							value={userTel}
							dataSource={userSource}
							onSelect={onUserSelect}
							onChange={onUserSelect}
							placeholder='输入用户电话'
						/>
					</Form.Item>
					<Form.Item label='司机电话'>
						<AutoComplete
							value={driverTel}
							dataSource={driverSource}
							onSelect={onDriverSelect}
							onChange={onDriverSelect}
							placeholder='输入司机电话'
						/>
					</Form.Item>
					<Form.Item label='出发点'>
						<Input value={start} onChange={changeStart} />
					</Form.Item>
					<Form.Item label='目的地'>
						<Input value={end} onChange={changeEnd} />
					</Form.Item>
					<Form.Item label='支付金额'>
						<Input value={payout} onChange={changePayout} />
					</Form.Item>
					<Form.Item label='支付方式'>
						<Input value={payway} onChange={changePayway} />
					</Form.Item>
					<Form.Item label='出发时间'>
						<DatePicker
							showTime
							placeholder='Select Time'
							onOk={onOk}
						/>
					</Form.Item>
				</Form>
				<PeopleInfoForm />
			</div>
			<div className='user-r'>
				<Button type='primary' onClick={toAddTask}>
					添加订单
				</Button>
			</div>
		</div>
	);
});

export default PlanDeparture;
