const express = require('express');
const mongoose = require('mongoose');
const Student = require('../schemes/student');
const School = require('../schemes/school');

const router = express.Router();

router.get('/getSchools', async (req, res) => {
	try {
		await mongoose.connect('mongodb://localhost/test4');
		const schools = await School.find().exec();

		res.send(schools);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
})

router.get('/getStudents', async (req, res) => {
	try {
		await mongoose.connect('mongodb://localhost/test4');

		const students = await Student.find().exec();
		res.send(students);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
})

module.exports = router;