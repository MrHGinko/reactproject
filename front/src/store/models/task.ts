import immutable from 'immutable';
import { Dispatch } from 'redux';

import API from '../../ajax/api';
import ajax from '../../ajax';

enum setTaskType {
	load = 'set_task_load',
	success = 'set_task_success',
	fail = 'set_task_fail',
}

const setTaskData = (type: setTaskType, data?: any) => ({
	type,
	data,
});

type Action = ReturnType<typeof setTaskData>;

export const getTaskList = () => (dispatch: Dispatch) => {
	const action = setTaskData(setTaskType.load); //{type, data}
	dispatch(action);

	ajax.get(API.TASK_LIST, {})
		.then(({ data }) => {
			const result = data.data.map((item: any) => {
				item.createTime = new Date(item.createTime).toLocaleString();
				item.departureTime = new Date(item.departureTime).toLocaleString();
				return item;
			});

			const action = setTaskData(setTaskType.success, result);
			dispatch(action);
		})
		.catch((error) => {
			console.log(error);
			const action = setTaskData(setTaskType.fail);
			dispatch(action);
		});
};

const initState = {
	task: [],
	status: 'waitng',
};

const immutableState = immutable.fromJS(initState);

export default (state = immutableState, action: Action) => {
	switch (action.type) {
		case setTaskType.load:
			return state.set(['status', 'loading']);
		case setTaskType.success:
			const newState = state.set('task', action.data);
			return newState.set('status', 'success');
		case setTaskType.fail:
			return state.set('status', 'fail');
		default:
			return state;
	}
};

export const setArrivalTime = function(id: any, time: any) {
	ajax.post(API.SET_ARRIVALTIME, { id, time })
		.then(({ data }) => {
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});
};
