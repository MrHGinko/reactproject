import { createStore, compose, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import root from './models/root';
import user from './models/user'
import task from './models/task'
import driver from './models/driver'

const reducer = combineReducers({
	// 添加自己的模块仓库
	root,
	task,
	user,
	driver
});

// 仓库需实现属于自己的数据获取以及方法
// 包括ajax请求方法的具体实现, 请写在仓库中并暴露出去

// 每一个相关的请求关联了仓库中的三步

/**
 *  构建方法名, (参数) => (dispatch 分发) => {函数体}
 * step1 首先更改仓库状态的status : loading 等待中, 更改后 分发dispatch(action)触发页面更新
 * step2 然后进行真正的请求数据 ajax.get()  传入api.url , 与得到的参数.
 * 		--->>> 在ajax返回的promise中进行下一步的dispatch
 * step3 -> true resolve 成功状态, 设置status: success 触发页面更新, 对参数进行dispatch(action) 设置仓库数据为请求数据
 *  -> false reject 失败 反之, status: fail
 */

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
