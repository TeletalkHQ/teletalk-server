const Validator = require("fastest-validator");

const {
	macAddressValidationSchema,
} = require("~/schema/validationSchema/macAddressValidationSchema");

const v = new Validator();

const macAddressValidation = {
	...macAddressValidationSchema,
};

const macAddressValidator = v.compile(macAddressValidation);

module.exports = { macAddressValidator, macAddressValidation };
