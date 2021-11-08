const Validator = require("fastest-validator");

const {
	bioValidation,
	cellphoneValidation,
	countryCodeValidation,
	countryNameValidation,
	// createdAtValidation,
	firstNameValidation,
	lastNameValidation,
	// macAddressValidation,
	privateIDValidation,
	usernameValidation,
} = require("~/validator/userPartValidator/indexUserPartValidator");

const v = new Validator();

const registerUserValidation = {
	bio: bioValidation,
	cellphone: cellphoneValidation,
	countryCode: countryCodeValidation,
	countryName: countryNameValidation,
	// createdAt: createdAtValidation,
	firstName: firstNameValidation,
	lastName: lastNameValidation,
	// macAddress: macAddressValidation,
	privateID: privateIDValidation,
	username: usernameValidation,
};

const registerUserValidator = v.compile(registerUserValidation);

module.exports = { registerUserValidator };
