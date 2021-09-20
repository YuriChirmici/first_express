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
				value: `${el.name}`
			}
			if (el.address) {
				school.value += ` (${el.address})`;
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
		const schoolsValue = this.get('schoolsValue');
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
			data.school = {
				isNew: true,
				name: $('input[name=schoolName]').val().trim(),
				address: $('input[name=schoolAddress]').val().trim(),
			}
		} else {
			if (!schoolsValue.name ||
				schoolsValue.name.trim().length === 0) {
					this.set('isError', true);
					return;
			}

			data.school = {
				isNew: false,
				_id: schoolsValue._id,
				name: schoolsValue.name,
			}
		}

		$.post('http://localhost:3000/students/saveStudent', data)
			.done(() => {
				this.set('isDataSent', true);
				fetchData();
			})
			.fail(() => {
				alert( "error" );
		});
		
	}
})

kendo.bind($('.students__inner'), viewModel);

$(function() {  
	fetchData();
});

function fetchData() {
	$.get('http://localhost:3000/api/getSchools', (data, status) => {
		viewModel.set('isLoading', false);
		viewModel.set('schools', data);
	})
}