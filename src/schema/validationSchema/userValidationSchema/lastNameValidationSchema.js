const {
	userSchemaTemplate: { lastName },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const lastNameValidationSchema = {
	lastName: {
		type: lastName.type.value,
		optional: !lastName.required.value,
		max: lastName.maxlength.value,
		trim: lastName.trim.value,
		messages: {
			string: lastName.type.error.message,
			stringMax: lastName.maxlength.error.message,
		},
	},
};

module.exports = { lastNameValidationSchema };
