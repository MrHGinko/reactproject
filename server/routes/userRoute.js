const express = require('express');
const User = require('../models/user');
const Task = require('../models/task');

const router = new express.Router();

router.post('/setcomment', async (req, res) => {
	const data = JSON.parse(req.query.comment);

	let result = await User.setComment(data.user, data.task, {
		text: data.text,
		score: data.score,
		remark: true,
	});

	Task.changeStatus(data.task, {
		remark: true,
	})

	if (result) {
		res.json({
			code: 0,
			message: 'ok',
		});
	} else {
		res.json({
			code: -1,
			message: 'fail',
		});
	}
});

router.get('/userList', async (req, res) => {
	let result = await User.getUser();
	result
		? res.json({
				code: 0,
				message: 'ok',
				data: result,
		  })
		: res.json({
				code: -1,
				message: 'fail',
		  });
});

router.post('/userRegiste', (req, res) => {
	const info = JSON.parse(req.query.userInfo);

	User.createUser(info)
		.then(() => {
			res.json({
				code: 0,
				message: 'ok',
			});
		})
		.catch((error) => {
			res.json({
				code: -1,
				message: error.message,
			});
		});
});

module.exports = router;
