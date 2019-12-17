const mongoose = require('mongoose');

const Driver = mongoose.model(
	'driver',
	mongoose.Schema({
		name: String,
		tel: {
			require: true,
			type: String,
		},
		status: {
			require: true,
			type: String,
			default: 'free',
			// 忙碌 busy
		},

		carNumber: {
			require: true,
			type: String,
		},
		carType: String,
		carSeat: Number,

		allPrice: {
			type: Number,
			default: 0,
		},

		// 任务列表
		taskList: [
			{
				task: {
					type: mongoose.SchemaTypes.ObjectId,
					ref: 'task',
				},
			},
		],
	}),
);

module.exports.getDriver = async () => {
	return await Driver.find();
};

module.exports.addDriver = async (info) => {
	const result = await Driver.findOne({ tel: info.tel });

	if (result) {
		throw new Error('该电话号码已注册');
	} else {
		let driver = new Driver({
			name: info.name,
			tel: info.tel,

			carNumber: info.carNumber,
			carSeat: info.carSeat,
			carType: info.carType,
			taskList: [],
		});
		return await driver.save();
	}
};

module.exports.changeStatus = async (id, status) => {
	return await Driver.findByIdAndUpdate(id, { status: status });
};

module.exports.addTask = async (id, task) => {
	let { taskList } = await Driver.findById(id);
	taskList.push(task);
	console.log(taskList);

	// 还需要修改对应订单状态会 待发车
	// 同时自身状态改为 忙碌
	return await Driver.findByIdAndUpdate(id, { taskList: taskList });
};
