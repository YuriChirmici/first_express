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

		let school = await setSchool(req.body.school);
		const student = await setStudent(school.data._id, req.body);

		//showData();

		//return null to the client if school is not new
		school = (school.isNew) ? school.data : null; 
		res.send({ status: 200, student, school });
	} catch(err) {
		console.log(err)
		res.sendStatus(500);
	}
})

async function setSchool(schoolData) {
	let { isNew, ...school } = schoolData;

	const findObj = {
		name: school.name, 
		address: school.address
	};

	const duplicate = await School.findOne(findObj).exec();
	if (!duplicate && isNew === "true") {
		const newSchool = new School({
			name: school.name,
			address: school.address
		});

		await newSchool.save();
		console.log('School successfully saved.');
		return { data: newSchool, isNew: true };
	} else {
		return { data: duplicate, isNew: false };;
	}
}

async function setStudent(school_id, data)  {
	const findObj = {
		firstName: data.firstName, 
		lastName: data.lastName, 
	};

	let student = await Student.findOne(findObj).exec();
	if (!student) {
		const newStudent = new Student({
			...findObj,
			address: data.address, 
			biography: data.biography, 
			school: { 
				_id: school_id, 
				name: data.school.name
			}
		});

		await newStudent.save();
		console.log('Student successfully saved.');
		student = newStudent;
	}

	return student;
}

async function showData() {
	const students = await Student.find().exec();
	const schools = await School.find().exec();
	console.log(students);
	console.log(schools);
}

module.exports = router;