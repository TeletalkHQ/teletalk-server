const Validator = require("fastest-validator");

const {
	schemaUserTemplate: { firstName },
} = require("~/template/userTemplate/schemaUserTemplate");

const v = new Validator();

const firstNameValidation = {
	firstName: {
		type: firstName.type[0],
		min: firstName.minlength[0],
		max: firstName.maxlength[0],
		trim: firstName.trim[0],
		messages: {
			string: firstName.type[1],
			required: firstName.required[1],
			stringMin: firstName.minlength[1],
			stringMax: firstName.maxlength[1],
		},
	},
};

const firstNameValidator = v.compile(firstNameValidation);

module.exports = { firstNameValidator, firstNameValidation };
