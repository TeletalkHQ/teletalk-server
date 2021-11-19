const Validator = require("fastest-validator");

const {
	userSchemaTemplate: { bio },
} = require("~/template/schemaTemplate/userSchemaTemplate");

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
