const {
	userSchemaTemplate: { macAddress },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const macAddressValidationSchema = {
	macAddress: {
		type: macAddress.type[0],
		unique: macAddress.unique[0],
		min: macAddress.minlength[0],
		max: macAddress.maxlength[0],
		trim: macAddress.trim[0],
		messages: {
			string: macAddress.type[1],
			unique: macAddress.unique[1],
			required: macAddress.required[1],
			stringMin: macAddress.minlength[1],
			stringMax: macAddress.maxlength[1],
		},
	},
};

module.exports = { macAddressValidationSchema };
