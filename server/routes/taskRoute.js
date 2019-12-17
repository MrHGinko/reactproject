const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.get('/taskList',async (req, res)=> {
	let result = await Task.getTask();
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
})

router.get('/createTask', (req, res) => {
	const { info } = req.body;
	console.log(info);
	console.log(info)

	Task.createTask(info)
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
})

module.exports = router;