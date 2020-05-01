const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/arrival', async (req, res) => {
	let data = req.query;

	await Task.changeStatus(data.id, {
		arrivalTime: data.time,
	});

	res.json({
		code: 0,
		message: 'ok',
	});
});

router.get('/taskList', async (req, res) => {
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
});

router.post('/createTask', async (req, res) => {
	const info = JSON.parse(req.query.taskInfo);

	let result = await Task.createTask(info)
	console.log(result);

	res.json({
		message: 'ok',
		code: 0,
	})
	// result拿到新增任务的ID 同时绑定到用户与司机上
});

module.exports = router;
