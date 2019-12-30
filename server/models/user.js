const mongoose = require('mongoose');

const User = mongoose.model(
	'user',
	mongoose.Schema({
		name: String,
		id: {
			required: true,
			type: String,
		},
		tel: {
			require: true,
			type: String,
		},
		callCount: {
			type: Number,
			default: 0,
		},
		allPrice: {
			type: Number,
			default: 0,
		},
		status: {
			type: Boolean,
			default: true,
		},

		comment: [
			{
				task: {
					type: mongoose.SchemaTypes.ObjectId,
					ref: 'task',
				},
				text: String,
				score: Number,
				remark: {
					type: Boolean,
					ref: 'task',
				},
			},
		],

		taskList: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'task',
			},
		],
	}),
);

module.exports.createUser = async (info) => {
	const result = await User.findOne({ tel: info.tel });

	if (result) {
		throw new Error('该电话号码已注册');
	} else {
		let user = new User({
			name: info.name,
			id: info.id,
			tel: info.tel,

			comment: [],
			taskList: [],
		});
		return await user.save();
	}
};

module.exports.getUser = async () => {
	return await User.find();
};

module.exports.setComment = async (userid, taskid, com) => {
	let { comment } = await User.findById(userid);

	comment.map((item) => {
		if (item.task == taskid) {
			item.text = com.text;
			item.score = com.score;
			item.remark = com.remark;
		}
	});

	// 注意 评论后还需要将对应订单remark关闭
	return await User.findByIdAndUpdate(userid, { comment: comment });
};
