const Validator = require("fastest-validator");

const {
	bioValidation,
	cellphoneValidation,
	countryCodeValidation,
	countryNameValidation,
	// createdAtValidation,
	firstNameValidation,
	lastNameValidation,
	macAddressValidation,
	privateIDValidation,
	usernameValidation,
} = require("~/validator/userPartValidator/indexUserPartValidator");

const v = new Validator();

const registerUserValidation = {
	...bioValidation,
	...cellphoneValidation,
	...countryCodeValidation,
	...countryNameValidation,
	// ...createdAtValidation,
	...firstNameValidation,
	...lastNameValidation,
	...macAddressValidation,
	...privateIDValidation,
	...usernameValidation,
};

const registerNormalUserValidator = v.compile(registerUserValidation);

module.exports = { registerNormalUserValidator };
