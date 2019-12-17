const express = require('express');
const Driver = require('../models/driver');
const router = new express.Router();

router.get('/driverList', async (req, res) => {
	let result = await Driver.getDriver();
	result
		? res.json({
				code: 0,
				message: 'ok',
				data: result,
		  })
		: res.json({
				code: -1,
				message: 'fail',
		  })
});

router.post('/driverRegiste', (req, res) => {
	const { info } = req.body;
	console.log(info);

	Driver.addDriver(info)
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

router.post('/driverAddTask', async (req, res) => {
	const { id, task } = req.body;
	console.log(id, task);

	let result = await Driver.addTask(id, task);
	result
		? res.json({
				code: 0,
				message: 'ok',
		  })
		: res.json({
				code: -1,
				message: 'fail',
		  });
});

router.post('/driverChangeStatus', (req, res) => {
	const { id, status } = req.body;
	console.log(status);

	Driver.changeStatus(id, status)
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
