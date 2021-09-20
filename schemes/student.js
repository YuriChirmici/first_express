const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: {
		type: String,
		required: true
	},
	lastName: String,
	school: { 
		_id: mongoose.Schema.Types.ObjectId,
		name: String
	},
	address: String,
	biography: String,
	created: {
		type: Date,
		default: Date.now
	}
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;