const mongoose = require('mongoose');
const Student = require('./schemes/student');
const School = require('./schemes/school');

mongoose.connect('mongodb://localhost/test3', (err) => {
	if (err) throw err;
	console.log('Successfully connected');

	const vazovSchool = new School({
		_id: new mongoose.Types.ObjectId(),
		name: 'Ivan Vazov'
	});
	
	vazovSchool.save((err) => {
		if (err) throw err;
		console.log('School successfully saved');
	
		const yuriStudent = new Student({
			_id: new mongoose.Types.ObjectId(),
			studentName: {
				firstName: 'Yuri',
				lastName: 'Kirmichi'
			},
			school: vazovSchool._id
		});
	
		yuriStudent.save((err) => {
			if (err) throw err;
			console.log('Student successfully saved');
		})
	
		const borisStudent = new Student({
			_id: new mongoose.Types.ObjectId(),
			studentName: {
				firstName: 'Boris'
			},
			school: vazovSchool._id
		})
	
		borisStudent.save((err) => {
			if (err) throw err;
	
			console.log('Student successfully saved');
		})
	})
});	