const Validator = require("fastest-validator");

const {
	userTemplate: {
		bio,
		cellphone,
		country_code,
		country_name,
		first_name,
		last_name,
		// mac_address,
		private_id,
		username,
	},
} = require("~/model/template/userTemplate/userTemplate");

const v = new Validator();

const userRegisterValidationSchema = {
	private_id: {
		type: private_id.type[0],
		unique: private_id.unique[0],
		min: private_id.minlength[0],
		max: private_id.maxlength[0],
		trim: private_id.trim[0],
		messages: {
			string: private_id.type[1],
			required: private_id.required[1],
			unique: private_id.unique[1],
			stringMin: private_id.minlength[1],
			stringMax: private_id.maxlength[1],
		},
	},
	username: {
		type: username.type[0],
		optional: !username.required[0],
		unique: username.unique[0],
		max: username.maxlength[0],
		trim: username.trim[0],
		lowercase: username.lowercase[0],
		messages: {
			string: username.type[1],
			unique: username.unique[1],
			stringMax: username.maxlength[1],
		},
	},
	first_name: {
		type: first_name.type[0],
		min: first_name.minlength[0],
		max: first_name.maxlength[0],
		trim: first_name.trim[0],
		messages: {
			string: first_name.type[1],
			required: first_name.required[1],
			stringMin: first_name.minlength[1],
			stringMax: first_name.maxlength[1],
		},
	},
	last_name: {
		type: last_name.type[0],
		optional: !last_name.required[0],
		max: last_name.maxlength[0],
		trim: last_name.trim[0],
		messages: {
			string: last_name.type[1],
			stringMax: last_name.maxlength[1],
		},
	},

	cellphone: {
		type: cellphone.type[0],
		unique: cellphone.unique[0],
		min: cellphone.minlength[0],
		max: cellphone.maxlength[0],
		messages: {
			string: cellphone.type[1],
			unique: cellphone.unique[1],
			required: cellphone.required[1],
			stringMin: cellphone.minlength[1],
			stringMax: cellphone.type[1],
		},
	},
	country_code: {
		type: country_code.type[0],
		min: country_code.minlength[0],
		max: country_code.maxlength[0],
		trim: country_code.trim[0],
		messages: {
			string: country_code.type[1],
			required: country_code.required[1],
			stringMin: country_code.minlength[1],
			stringMax: country_code.maxlength[1],
		},
	},
	country_name: {
		type: country_name.type[0],
		min: country_name.minlength[0],
		max: country_name.maxlength[0],
		messages: {
			string: country_name.type[1],
			required: country_name.required[1],
			stringMin: country_name.minlength[1],
			stringMax: country_name.maxlength[1],
		},
	},
	bio: {
		type: bio.type[0],
		optional: !bio.required[0],
		max: bio.maxlength[0],
		messages: {
			string: bio.type[1],
			stringMax: bio.maxlength[1],
		},
	},
	// mac_address: {
	// 	type: mac_address.type[0],
	// 	unique: mac_address.unique[0],
	// 	min: mac_address.minlength[0],
	// 	max: mac_address.maxlength[0],
	// 	trim: mac_address.trim[0],
	// 	messages: {
	// 		string: mac_address.type[1],
	// 		unique: mac_address.unique[1],
	// required: mac_address.required[1],
	// 		stringMin: mac_address.minlength[1],
	// 		stringMax: mac_address.maxlength[1],
	// 	},
	// },
	// created_at: {
	// 	type: created_at.type[0],
	// 	optimal: !created_at.required[0],
	// },
};

const userRegisterValidator = v.compile(userRegisterValidationSchema);

exports.userRegisterValidator = userRegisterValidator;
