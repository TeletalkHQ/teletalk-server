const Validator = require("fastest-validator");

const {
	userDefaultValue: {
		bio,
		cellphone,
		country_code,
		country_name,
		created_at,
		first_name,
		last_name,
		mac_address,
		private_id,
		username,
	},
} = require("~/model/defaultValue/userDefaultValue");

const v = new Validator();

const userRegisterValidationSchema = {
	private_id: {
		type: private_id.type[0],
		unique: private_id.unique[0],
		min: private_id.minlength[0],
		max: private_id.maxlength[0],
		trim: private_id.trim[0],
	},
	username: {
		type: username.type[0],
		optional: !username.required[0],
		unique: username.unique[0],
		max: username.maxlength[0],
		trim: username.trim[0],
		lowercase: username.lowercase[0],
	},
	first_name: {
		type: first_name.type[0],
		min: first_name.minlength[0],
		max: first_name.maxlength[0],
		trim: first_name.trim[0],
	},
	last_name: {
		type: last_name.type[0],
		optional: !last_name.required[0],
		max: last_name.maxlength[0],
		trim: last_name.trim[0],
	},
	cellphone: {
		type: cellphone.type[0],
		unique: cellphone.unique[0],
		min: cellphone.minlength[0],
		max: cellphone.maxlength[0],
	},
	country_code: {
		type: country_code.type[0],
		min: country_code.minlength[0],
		max: country_code.maxlength[0],
		trim: country_code.trim[0],
	},
	country_name: {
		type: country_name.type[0],
		min: country_name.minlength[0],
		max: country_name.maxlength[0],
	},
	bio: {
		type: bio.type[0],
		optional: !bio.required[0],
		max: bio.maxlength[0],
	},
	mac_address: {
		type: mac_address.type[0],
		unique: mac_address.unique[0],
		min: mac_address.minlength[0],
		max: mac_address.maxlength[0],
		trim: mac_address.trim[0],
	},
	// created_at: {
	// 	type: created_at.type[0],
	// 	optimal: !created_at.required[0],
	// },
};

const userRegisterValidator = v.compile(userRegisterValidationSchema);

exports.userRegisterValidator = userRegisterValidator;
