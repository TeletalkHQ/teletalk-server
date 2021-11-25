const {
	userSchemaTemplate: { username },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const usernameValidationSchema = {
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

module.exports = { usernameValidationSchema };
