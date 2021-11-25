const {
	userSchemaTemplate: { countryCode },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const countryCodeValidationSchema = {
	countryCode: {
		type: countryCode.type.value,
		min: countryCode.minlength.value,
		max: countryCode.maxlength.value,
		trim: countryCode.trim.value,
		messages: {
			string: countryCode.type.error.message,
			required: countryCode.required.error.message,
			stringMin: countryCode.minlength.error.message,
			stringMax: countryCode.maxlength.error.message,
		},
	},
};

module.exports = { countryCodeValidationSchema };
