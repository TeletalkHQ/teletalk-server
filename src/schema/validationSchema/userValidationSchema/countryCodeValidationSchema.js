const {
	userSchemaTemplate: {
		countryCode: { properties: countryCode },
	},
} = require("~/template/schemaTemplate/userSchemaTemplate");

const countryCodeValidationSchema = {
	properties: {
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
	},

	info: {
		version: "1.0.0",
	},
};

module.exports = { countryCodeValidationSchema };
