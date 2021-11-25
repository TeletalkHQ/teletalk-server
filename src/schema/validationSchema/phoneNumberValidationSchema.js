const {
	userSchemaTemplate: { phoneNumber },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const phoneNumberValidationSchema = {
	phoneNumber: {
		type: phoneNumber.type[0],
		// unique: phoneNumber.unique[0],
		min: phoneNumber.minlength[0],
		max: phoneNumber.maxlength[0],
		messages: {
			string: phoneNumber.type[1],
			// unique: phoneNumber.unique[1],
			required: phoneNumber.required[1],
			stringMin: phoneNumber.minlength[1],
			stringMax: phoneNumber.maxlength[1],
		},
	},
};

module.exports = { phoneNumberValidationSchema };
