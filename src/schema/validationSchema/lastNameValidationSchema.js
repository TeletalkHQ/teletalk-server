const {
	userSchemaTemplate: { lastName },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const lastNameValidationSchema = {
	lastName: {
		type: lastName.type[0],
		optional: !lastName.required[0],
		max: lastName.maxlength[0],
		trim: lastName.trim[0],
		messages: {
			string: lastName.type[1],
			stringMax: lastName.maxlength[1],
		},
	},
};

module.exports = { lastNameValidationSchema };
