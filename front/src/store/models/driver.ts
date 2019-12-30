import immutable from 'immutable';
import { Dispatch } from 'redux';

import API from '../../ajax/api';
import ajax from '../../ajax';

enum setDriverType {
	load = 'set_driver_load',
	success = 'set_driver_success',
	fail = 'set_driver_fail',
}

const setDriverData = (type: setDriverType, data?: any) => ({
	type,
	data,
});

type Action = ReturnType<typeof setDriverData>;

export const getDriverList = () => (dispatch: Dispatch) => {
	const action = setDriverData(setDriverType.load);
	dispatch(action);

	ajax.get(API.DRIVER_LIST, {})
		.then(({ data }) => {
			const action = setDriverData(setDriverType.success, data.data);
			dispatch(action);
		})
		.catch((error) => {
			console.log(error);
			const action = setDriverData(setDriverType.fail);
			dispatch(action);
		});
};

const initState = {
	driver: [],
	status: 'waitng',
};

const immutableState = immutable.fromJS(initState);

export default (state = immutableState, action: Action) => {
	switch (action.type) {
		case setDriverType.load:
			return state.set(['status', 'loading']);
		case setDriverType.success:
			const newState = state.set('driver', action.data);
			return newState.set('status', 'success');
		case setDriverType.fail:
			return state.set('status', 'fail');
		default:
			return state;
	}
};
