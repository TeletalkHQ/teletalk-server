const Validator = require("fastest-validator");

const v = new Validator();

const userRegisterValidationSchema = {
	private_id: { type: "string" },
	username: { type: "string", min: 3, trim: true, lowercase: true },
	first_name: {},
	last_name: {},
	cellphone: {},
	country_code: {},
	country_name: {},
	bio: {},
	mac_address: {},
	created_at: {},
};

v.compile(userRegisterValidationSchema);

exports.userRegisterValidator = () => {};
