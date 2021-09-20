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

router.post(actionURL, (req, res) => {
	mongoose.connect('mongodb://localhost/test4', (err) => {
		if (err) throw err;
		const { school } = req.body;
		
		if (school.isNew) {
			//checks if it is already in the database
			const findObj = {name: school.name};
			if (school.address) {
				findObj.address = school.address;
			}
			School.find(findObj).exec(function(err, schools) {
				if (err) throw err;
				
				if (schools.length === 0) {
					const newSchool = new School({
						_id: new mongoose.Types.ObjectId(),
						name: school.name,
						address: school.address
					});
					newSchool.save((err) => {
						if (err) throw err;
		
						createNewStudent(newSchool._id, req.body)
		
						console.log('School successfully saved.');
					})
				} else {
					createNewStudent(schools[0]._id, req.body)
				}
			});
		}
		else {
			createNewStudent(school._id, req.body);
		}
	})
	res.send({result: 'ok'})
	
})

function createNewStudent(school_id, data)  {
	const findObj = {
		firstName: data.firstName, 
		lastName: data.lastName, 
		address: data.address, 
		biography: data.biography, 
		school: { 
			_id: school_id, 
			name: data.school.name 
		}
	};
	
	Student.find(findObj).exec(function(err, students) {
		if (err) throw err;

		if (students.length === 0) {
			const newStudent = new Student({
				_id: new mongoose.Types.ObjectId(),
				...findObj				
			});

			newStudent.save((err) => {
				if (err) throw err;

				console.log('Student successfully saved.');
			})
		}
	});
}

module.exports = router;