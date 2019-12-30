import { Action } from 'redux';
import { Map } from 'immutable';

const initialState = Map({
	locale: 'zhCN',
	isLogin: true,
	userInfo: Map({
		role: 'admin',
	}),
});

/*

*/

export default (state = initialState, action: Action) => {
	return state;
};
      