const {
	userSchemaTemplate: { firstName },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const firstNameValidationSchema = {
	firstName: {
		type: firstName.type.value,
		min: firstName.minlength.value,
		max: firstName.maxlength.value,
		trim: firstName.trim.value,
		messages: {
			string: firstName.type.error.message,
			required: firstName.required.error.message,
			stringMin: firstName.minlength.error.message,
			stringMax: firstName.maxlength.error.message,
		},
	},
};

module.exports = { firstNameValidationSchema };
