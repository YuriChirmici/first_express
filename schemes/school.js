const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	address: String,
	created: {
		type: Date,
		default: Date.now
	}
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;