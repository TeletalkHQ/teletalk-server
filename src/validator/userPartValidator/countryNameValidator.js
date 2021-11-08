const Validator = require("fastest-validator");

const {
	schemaUserTemplate: { countryName },
} = require("~/template/userTemplate/schemaUserTemplate");

const v = new Validator();

const countryNameValidation = {
	countryName: {
		type: countryName.type[0],
		min: countryName.minlength[0],
		max: countryName.maxlength[0],
		messages: {
			string: countryName.type[1],
			required: countryName.required[1],
			stringMin: countryName.minlength[1],
			stringMax: countryName.maxlength[1],
		},
	},
};

const countryNameValidator = v.compile(countryNameValidation);

module.exports = { countryNameValidator, countryNameValidation };
