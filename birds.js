const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('hello from birds');
  next();
})

router.get('/', (req, res) => {
  res.send('<h1>birds main</h1>');
})

router.get('/about/:id', (req, res) => {
  res.send('about birds: ' + req.params.id);
})

module.exports = router;