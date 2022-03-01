const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	macAddressValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/macAddressValidationSchema");

const macAddressValidation = {
	properties: { ...macAddressValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const macAddressValidator = validatorCompiler(macAddressValidation.properties);

module.exports = { macAddressValidator, macAddressValidation };
