const {
	userSchemaTemplate: { phoneNumber },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const phoneNumberValidationSchema = {
	phoneNumber: {
		type: phoneNumber.type.value,
		// unique: phoneNumber.unique.value,
		min: phoneNumber.minlength.value,
		max: phoneNumber.maxlength.value,
		messages: {
			string: phoneNumber.type.error.message,
			// unique: phoneNumber.unique.error.message,
			required: phoneNumber.required.error.message,
			stringMin: phoneNumber.minlength.error.message,
			stringMax: phoneNumber.maxlength.error.message,
		},
	},
};

module.exports = { phoneNumberValidationSchema };
