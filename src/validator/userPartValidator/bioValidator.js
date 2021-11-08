const Validator = require("fastest-validator");

const {
	schemaUserTemplate: { bio },
} = require("~/template/userTemplate/schemaUserTemplate");

const v = new Validator();

const bioValidation = {
	bio: {
		type: bio.type[0],
		optional: !bio.required[0],
		max: bio.maxlength[0],
		messages: {
			string: bio.type[1],
			stringMax: bio.maxlength[1],
		},
	},
};

const bioValidator = v.compile(bioValidation);

module.exports = { bioValidator, bioValidation };
