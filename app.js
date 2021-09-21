const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');

const students = require('./pages/students');
const api = require('./api/api');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({	extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/students', students);
app.use('/api', api);

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index', {title: 'Stundets page', message: 'Hello there!'});
});

app.listen(port, () => {
	console.log('port: ' + port);
})
