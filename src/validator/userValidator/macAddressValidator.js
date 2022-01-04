const Validator = require("fastest-validator");

const {
	macAddressValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/macAddressValidationSchema");

const v = new Validator();

const macAddressValidation = {
	properties: { ...macAddressValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const macAddressValidator = v.compile(macAddressValidation.properties);

module.exports = { macAddressValidator, macAddressValidation };
