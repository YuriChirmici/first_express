const express = require('express');
const mongoose = require('mongoose');
const Student = require('../schemes/student');
const School = require ('../schemes/school');

const router = express.Router();

const actionURL = '/saveStudent';
router.get('/', (req, res) => {
	res.render('students', { 
		action: actionURL 
	})
})

router.post(actionURL, async (req, res) => {
	try {
		await mongoose.connect('mongodb://localhost/test4');

		const { school } = req.body;

		if (school.isNew === "true") {
			//checks if it is already in the database
			setSchool(school, req, res);
		}
		else {
			setStudent(school._id, req, res);
		}

		//showData();

	} catch(err) {
		res.sendStatus(500);
		console.log(err)
	}
})

async function setSchool(school, req, res) {
	const findObj = {
		name: school.name, 
		address: school.address
	};

	try {
		const schools = await School.find(findObj).exec();
		if (schools.length === 0) {
			const newSchool = new School({
				_id: new mongoose.Types.ObjectId(),
				name: school.name,
				address: school.address
			});

			try {
				await newSchool.save();
				console.log('School successfully saved.');
				res.sendStatus(200);
			} catch(err) {
				console.log(err);
				res.sendStatus(500);
			}
		} else {
			setStudent(schools[0]._id, req, res)
		}
	}
	catch(err) {
		console.log(err);
		res.sendStatus(500);
	}
}

async function setStudent(school_id, req, res)  {
	const data = req.body;
	const findObj = {
		firstName: data.firstName, 
		lastName: data.lastName, 
		address: data.address, 
		biography: data.biography, 
		school: { 
			_id: school_id, 
			name: data.school.name,
			address: data.school.address 
		}
	};
	try {
		const students = await Student.find(findObj).exec();
		if (students.length === 0) {
			const newStudent = new Student({
				_id: new mongoose.Types.ObjectId(),
				...findObj
			});

			try {
				await newStudent.save();
				console.log('Student successfully saved.');
				res.sendStatus(200);
			} catch(err) {
				console.log(err)
				res.sendStatus(500);
			}
		} else {
			res.sendStatus(200);
		}
	} catch(err) {
		console.log(err);
		res.sendStatus(500);
	}
}

async function showData() {
	try {
		const students = await Student.find().exec();
		const schools = await School.find().exec();
		console.log(students);
		console.log(schools);
	} catch (err) {
		console.log(err);
	}
}

module.exports = router;