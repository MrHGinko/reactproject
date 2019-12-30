import React, { useState, useCallback } from 'react';
import { Button, Form, Input, message } from 'antd';
import { addUser } from '../../../store/models/user';

import './style.scss';

const PlanDeparture: React.FC<{}> = function PlanDeparture(this: any) {
	const [info, setInfo] = useState({
		name: '',
		tel: '',
		id: '',
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

	const changeID = useCallback(
		(e: any) => {
			setInfo({ ...info, id: e.target.value });
		},
		[info],
	);

	const toAddUser = async function(info: any) {
		let result = await addUser(info)
		if(result.code === 0 && result.message === 'ok') {
			message.success('添加成功');
			setInfo({name: '', tel: '', id: ''});
		} else {
			message.error('添加失败');
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
					<Form.Item label='身份证号'>
						<Input placeholder='' value={info.id} onChange={changeID} />
					</Form.Item>
				</Form>
			</div>
			<div className='user-r'>
				<Button type='primary' onClick={toAddUser.bind(this, info)}>
					{' '}
					添加用户{' '}
				</Button>
			</div>
		</div>
	);
};

export default PlanDeparture;
