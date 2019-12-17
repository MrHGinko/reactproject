const express = require('express');
const User = require('../models/user');

const router = new express.Router();

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
	const { info } = req.body;
	console.log(info);

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
