const {
	userSchemaTemplate: { countryName },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const countryNameValidationSchema = {
	countryName: {
		type: countryName.type.value,
		min: countryName.minlength.value,
		max: countryName.maxlength.value,
		messages: {
			string: countryName.type.error.message,
			required: countryName.required.error.message,
			stringMin: countryName.minlength.error.message,
			stringMax: countryName.maxlength.error.message,
		},
	},
};

module.exports = { countryNameValidationSchema };
