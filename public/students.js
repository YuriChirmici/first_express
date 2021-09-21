const viewModel = kendo.observable({
	isLoading: true,
	isNewSchool: false,
	isDataSent: false,
	isError: false,
	schools: [],

	schoolsOptions() {
		//generates data for dropdownlist
		return this.get('schools').map( el => {
			const school = {
				name: el.name,
				value: el.name,
				fullname: el.name,
				address: el.address,
				_id: el._id
			}
			if (el.address) {
				school.fullname += ` (${el.address})`;
			}
			return school;
		});
	},

	schoolsValue: {},
	students: [],

	changeIsNewSchool(isNewSchool) {
		return () => {
			this.set('isNewSchool', isNewSchool);
		}
	},

	sendStudent(e) {
		e.preventDefault();
		const isNewSchool = this.get('isNewSchool');
		const currentSchool = this.get('schoolsValue');
		const schoolsValue = currentSchool.value;

		this.set('isError', false);
		this.set('isDataSent', false);

		const firstName = $('input[name=firstName]').val().trim();

		if (firstName.length === 0) {
			this.set('isError', true);
			return;
		}

		let data = {
			firstName,
			lastName: $('input[name=lastName]').val().trim(),
			address: $('input[name=address]').val().trim(),
			biography: $('input[name=biography]').val().trim(),
		}

		if(isNewSchool) {
			const name = $('input[name=schoolName]').val().trim();
			if (!name) {
				this.set('isError', true);
				return;
			}
			data.school = {
				isNew: true,
				name,
				address: $('input[name=schoolAddress]').val().trim(),
			}
		} else {
			if (!schoolsValue || schoolsValue.trim().length === 0) {
				this.set('isError', true);
				return;
			}

			data.school = {
				isNew: false,
				_id: currentSchool._id,
				name: currentSchool.name,
				address: currentSchool.address,
			}
		}
		
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/students/saveStudent',
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: 'application/json'
		})
			.done(({student, school}) => {
				this.set('isDataSent', true);
				if(school) {
					const schools = this.get('schools');
					this.set('schools', [...schools, school]);
				}
				if(student) {
					const students = this.get('students');
					this.set('students', [...students, student]);
				}
			})		
	}
})

kendo.bind($('.students__inner'), viewModel);

$(function() {  
	fetchData();	
});


async function fetchData() {
	await $.get('http://localhost:3000/api/getSchools', (data) => {
		viewModel.set('schools', data);
	})
	await $.get('http://localhost:3000/api/getStudents', (data) => {
		viewModel.set('students', data);
	})
	console.log(viewModel.get('students'));
	viewModel.set('isLoading', false);
}