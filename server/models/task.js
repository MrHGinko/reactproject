const mongoose = require('mongoose');

const Task = mongoose.model(
	'task',
	mongoose.Schema({
		// _id 订单id由mongoDB自动生成

		userTel: {
			type: Number,
			ref: 'user',
		},

		driverTel: {
			type: Number,
			ref: 'driver',
		},

		peopleNumber: {
			type: Number,
			require: true,
		},
		peopleInfo: [
			{
				name: String,
				tel: {
					type: String,
					require: true,
				},
				ID: {
					type: String,
					require: true,
				},
			},
		],

		start: String,
		end: String,

		createTime: {
			type: Date,
			default: new Date().getTime(),
		},

		departureTime: {
			type: Date,
			require: true,
		},

		// 到达时间设置 status = 已结束
		arrivalTime: {
			type: Date,
			default: null,
		},

		remark: {
			type: Boolean,
			default: false,
		},

		payout: {
			type: Number,
			require: true,
		},
		payway: String,

		status: {
			type: String,
			default: '待接单',
		},
	}),
);

module.exports.createTask = async (info) => {
	let task = new Task({
		userTel: info.userTel,
		driverTel: info.driverTel,
		peopleNumber: info.peopleNumber,
		peopleInfo: info.peopleInfo,
		start: info.start,
		end: info.end,
		// createTime 自动生成
		departureTime: info.departureTime,
		// arrivalTime 等待订单完成设置
		// remark 需要等待arrival设置后才开放
		payout: info.payout,
		payway: info.payway,
		// status 自动生成
	});

	return await task.save();
};

module.exports.getTask = async () => {
	// 暂时返回所有的订单
	return await Task.find();
};

module.exports.changeStatus = async (id, status) => {
	Object.entries(status).forEach(async ([key, value]) => {
		switch (key) {
			case 'peopleNumber':
				await Task.findByIdAndUpdate(id, { peopleNumber: value });
				break;
			case 'peopleInfo':
				await Task.findByIdAndUpdate(id, { peopleInfo: value });
				break;
			case 'arrivalTime':  // 开启 remark
				await Task.findByIdAndUpdate(id, { arrivalTime: value, remark: true });
				break;
			case 'status':
				await Task.findByIdAndUpdate(id, { status: value });
				break;
		}
	});
};

module.exports.deleteTask = async (id) => {
	return await Task.findByIdAndRemove(id);
}