const {
	userSchemaTemplate: { username },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const usernameValidationSchema = {
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
};

module.exports = { usernameValidationSchema };
