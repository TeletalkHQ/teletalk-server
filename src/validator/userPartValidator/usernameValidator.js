const Validator = require("fastest-validator");

const {
	schemaUserTemplate: { username },
} = require("~/template/userTemplate/schemaUserTemplate");

const v = new Validator();

const usernameValidation = {
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
};

const usernameValidator = v.compile(usernameValidation);

module.exports = { usernameValidator, usernameValidation };
