const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser')
const birds = require('./birds');
const cars = require('./cars');

const app = express();
const port = 3000;
const actionURL = '/showData';

app.use(bodyParser.urlencoded({	extended: true }));
app.use('/birds', birds);
app.use('/cars', cars);

app.set('views', './views');
app.set('view engine', 'pug');

app.route('/')
	.get((req, res, next) => {
		res.render('index', {title: 'attempt 5', message: 'hello again!', actionURL});
		next();
	})
	.get((req, res) => {
		console.log('next() test');
	});

app.route(actionURL)
	.post((req, res) => {
		res.render('message', {message : req.body.message });
	});

app.listen(port, () => {
	console.log('port: ' + port);
})
