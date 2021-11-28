const {
	userSchemaTemplate: { macAddress },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const macAddressValidationSchema = {
	macAddress: {
		type: macAddress.type.value,
		unique: macAddress.unique.value,
		min: macAddress.minlength.value,
		max: macAddress.maxlength.value,
		trim: macAddress.trim.value,
		messages: {
			string: macAddress.type.error.message,
			unique: macAddress.unique.error.message,
			required: macAddress.required.error.message,
			stringMin: macAddress.minlength.error.message,
			stringMax: macAddress.maxlength.error.message,
		},
	},
};

module.exports = { macAddressValidationSchema };
