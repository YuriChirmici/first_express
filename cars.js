const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
	console.log('hello from cars');
	next();
})

router.get('/', (req, res) => {
	res.send('cars main');
})

router.get('/:id', (req, res) => {
	res.send(`car: ${req.params.id}`);
})

module.exports = router;