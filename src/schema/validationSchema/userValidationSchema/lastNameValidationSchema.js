const {
	userSchemaTemplate: {
		lastName: { properties: lastName },
	},
} = require("~/template/schemaTemplate/userSchemaTemplate");

const lastNameValidationSchema = {
	properties: {
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
	},

	info: {
		version: "1.0.0",
	},
};

module.exports = { lastNameValidationSchema };
