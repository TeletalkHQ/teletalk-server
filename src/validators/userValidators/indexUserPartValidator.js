const { bioValidator, bioValidation } = require("~/validators/userValidators/bioValidator");

const {
	cellphoneValidator,
	cellphoneValidation,
} = require("~/validators/userValidators/cellphoneValidator");

const {
	countryCodeValidator,
	countryCodeValidation,
} = require("~/validators/userValidators/countryCodeValidator");

const {
	countryNameValidator,
	countryNameValidation,
} = require("~/validators/userValidators/countryNameValidator");

const {
	createdAtValidator,
	createdAtValidation,
} = require("~/validators/userValidators/createdAtValidator");

const {
	firstNameValidator,
	firstNameValidation,
} = require("~/validators/userValidators/firstNameValidator");

const {
	lastNameValidator,
	lastNameValidation,
} = require("~/validators/userValidators/lastNameValidator");

const {
	macAddressValidator,
	macAddressValidation,
} = require("~/validators/userValidators/macAddressValidator");

const {
	privateIDValidator,
	privateIDValidation,
} = require("~/validators/userValidators/privateIDValidator");

const {
	usernameValidator,
	usernameValidation,
} = require("~/validators/userValidators/usernameValidator");

const {
	verificationCodeValidator,
	verificationCodeValidation,
} = require("~/validators/userValidators/verificationCodeValidator");

module.exports = {
	bioValidation,
	bioValidator,
	cellphoneValidation,
	cellphoneValidator,
	countryCodeValidation,
	countryCodeValidator,
	countryNameValidation,
	countryNameValidator,
	createdAtValidation,
	createdAtValidator,
	firstNameValidation,
	firstNameValidator,
	lastNameValidation,
	lastNameValidator,
	macAddressValidation,
	macAddressValidator,
	privateIDValidation,
	privateIDValidator,
	usernameValidation,
	usernameValidator,
	verificationCodeValidation,
	verificationCodeValidator,
};
