const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use('/api/user', require('./routes/userRoute'));

app.use('/api/driver', require('./routes/driverRoute'));

app.use('/api/task', require('./routes/taskRoute'));

mongoose.connect('mongodb://localhost:27017/reacteam', { useNewUrlParser: true }, (error) => {
	if (error) {
		console.log('数据库连接失败', error);
	} else {
		console.log('数据库连接成功');
		app.listen(
			{
				hostname: 'localhost',
				port: 3001,
			},
			(error) => {
				if (error) console.log(error);
				else {
					console.log('start OK on port 3001');
				}
			},
		);
	}
});
