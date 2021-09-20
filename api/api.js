const express = require('express');
const mongoose = require('mongoose');
const Student = require('../schemes/student');
const School = require('../schemes/school');

const router = express.Router();

router.get('/getSchools', (req, res) => {
    mongoose.connect('mongodb://localhost/test4', (err) => {
        if (err) throw err; 

        School.find().exec((err, schools) => {
            if (err) throw err;

            res.send(schools);
        })
    })
})

module.exports = router;