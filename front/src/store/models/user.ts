import immutable from 'immutable';
import { Dispatch } from 'redux';

import API from '../../ajax/api';
import ajax from '../../ajax';

// 对应action.type
enum setUserType {
	load = 'set_uesr_load',
	success = 'set_user_success',
	fail = 'set_user_fail',
}

// 传入的action值
const setUserData = (type: setUserType, data?: any) => ({
	type,
	data,
});

type Action = ReturnType<typeof setUserData>;

export const getUserList = () => (dispatch: Dispatch) => {
	// 第一步 设置loading
	const action = setUserData(setUserType.load);
	dispatch(action);

	// 第二步 ajax请求, 分支成功 或 失败
	ajax.get(API.USER_LIST, {})
		.then(({ data }) => {
			const action = setUserData(setUserType.success, data.data);
			dispatch(action);
		})
		.catch((error) => {
			const action = setUserData(setUserType.fail);
			console.log(error);
			dispatch(action);
		});
};

const initState = {
	user: [],
	status: 'waiting',
};

const immutableState = immutable.fromJS(initState);

export default (state = immutableState, action: Action) => {
	switch (action.type) {
		case setUserType.load:
			return state.set('status', 'loading');
		case setUserType.success:
			const newState = state.set('user', action.data);
			return newState.set('status', 'success');
		case setUserType.fail:
			return state.set('status', 'fail');
		default:
			return state;
	}
};
