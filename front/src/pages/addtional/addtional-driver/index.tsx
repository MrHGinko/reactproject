import React, { useState, useCallback } from 'react';
import { Button, Form, Input, message } from 'antd';
import { addDriver } from '../../../store/models/driver';


import './style.scss';

const PlanRushHour: React.FC<{}> = function PlanDeparture(this: any) {
	const [info, setInfo] = useState({
		name: '',
		tel: '',
		carNumber: '',
		carSeat: 0,
		carType: '',
	});

	const changeName = useCallback(
		(e: any) => {
			setInfo({ ...info, name: e.target.value });
		},
		[info],
	);
	const changeTel = useCallback(
		(e: any) => {
			setInfo({ ...info, tel: e.target.value });
		},
		[info],
	);
	const changeCarNumber = useCallback(
		(e: any) => {
			setInfo({ ...info, carNumber: e.target.value });
		},
		[info],
	);

	const changeCarSeat = useCallback(
		(e: any) => {
			setInfo({ ...info, carSeat: e.target.value });
		},
		[info],
	);
	const changeCarType = useCallback(
		(e: any) => {
			setInfo({ ...info, carType: e.target.value });
		},
		[info],
	);

	const toAddDriver = async function(info: any) {
		let result = await addDriver(info);
		if (result.code === 0 && result.message === 'ok') {
			message.success('添加成功');
			setInfo({ name: '', tel: '', carNumber: '', carSeat: 0, carType:''});
		} else {
			
		}
	};

	return (
		<div className='user'>
			<div className='user-l'>
				<Form>
					<Form.Item label='姓名'>
						<Input placeholder='' value={info.name} onChange={changeName} />
					</Form.Item>
					<Form.Item label='电话号码'>
						<Input placeholder='' value={info.tel} onChange={changeTel} />
					</Form.Item>
					<Form.Item label='车牌号'>
						<Input placeholder='' value={info.carNumber} onChange={changeCarNumber} />
					</Form.Item>
					<Form.Item label='车辆类型'>
						<Input placeholder='' value={info.carType} onChange={changeCarType} />
					</Form.Item>
					<Form.Item label='座位数'>
						<Input placeholder='' value={info.carSeat} onChange={changeCarSeat} />
					</Form.Item>
				</Form>
			</div>
			<div className='user-r'>
				<Button type='primary' onClick={toAddDriver.bind(this, info)}>
					添加司机与对应车辆信息
				</Button>
			</div>
		</div>
	);
};

export default PlanRushHour;
