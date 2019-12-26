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

router.get('/createTask', (req, res) => {
	const { info } = req.body;

	// let info = {
	// 	userTel: '14512345897',
	// 	driverTel: '12344568463',
	// 	peopleNumber: 2,
	// 	peopleInfo: [
	// 		{
	// 			name: '诸葛一',
	// 			tel: '12345678912',
	// 			ID: '123123201911241111',
	// 		},
	// 		{
	// 			name: '诸葛二',
	// 			tel: '98765432112',
	// 			ID: '222222202212453333',
	// 		}
	// 	],
	// 	start: '北京南门',
	// 	end: '北平东门',
	// 	departureTime: new Date().toLocaleString(),

	// 	payout: 600,
	// 	payway: '微信',
	// };

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
});

module.exports = router;
