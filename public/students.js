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
			}
		}

		$.post('http://localhost:3000/students/saveStudent', data, status)
			.done(() => {
				console.log(status);
				this.set('isDataSent', true);
				fetchSchools();
			})
			.fail(() => {
				alert( "error" );
		});
		
	}
})

kendo.bind($('.students__inner'), viewModel);

$(function() {  
	fetchSchools();
});

function fetchSchools() {
	$.get('http://localhost:3000/api/getSchools', (data) => {
		viewModel.set('isLoading', false);
		viewModel.set('schools', data);
	})
}