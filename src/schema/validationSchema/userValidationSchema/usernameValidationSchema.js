const {
	userSchemaTemplate: {
		username: { properties: username },
	},
} = require("~/template/schemaTemplate/userSchemaTemplate");

const usernameValidationSchema = {
	properties: {
		username: {
			type: username.type.value,
			optional: !username.required.value,
			unique: username.unique.value,
			max: username.maxlength.value,
			trim: username.trim.value,
			lowercase: username.lowercase.value,
			messages: {
				string: username.type.error.message,
				unique: username.unique.error.message,
				stringMax: username.maxlength.error.message,
			},
		},
	},

	info: {
		version: "1.0.0",
	},
};

module.exports = { usernameValidationSchema };
