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
			type: String,
			default: 'OK',
		},

		comment: [
			{
				task: {
					type: mongoose.SchemaTypes.ObjectId,
					ref: 'task',
				},
				text: String,
				score: Number,
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
		});
		return await user.save();
	}
};

module.exports.getUser = async () => {
	return await User.find();
};

module.exports.addComment = async (id, comment) => {
	let { commentList } = await Driver.findById(id);
	commentList.push(comment);
	console.log(commentList);

	// 注意 评论后还需要将对应订单remark关闭
	return await User.findByIdAndUpdate(id, { comment: commentList });
};
