const { bioValidator, bioValidation } = require("~/validator/userValidator/bioValidator");

const {
	cellphoneValidator,
	cellphoneValidation,
} = require("~/validator/userValidator/cellphoneValidator");

const {
	countryCodeValidator,
	countryCodeValidation,
} = require("~/validator/userValidator/countryCodeValidator");

const {
	countryNameValidator,
	countryNameValidation,
} = require("~/validator/userValidator/countryNameValidator");

const {
	createdAtValidator,
	createdAtValidation,
} = require("~/validator/userValidator/createdAtValidator");

const {
	firstNameValidator,
	firstNameValidation,
} = require("~/validator/userValidator/firstNameValidator");

const {
	lastNameValidator,
	lastNameValidation,
} = require("~/validator/userValidator/lastNameValidator");

const {
	macAddressValidator,
	macAddressValidation,
} = require("~/validator/userValidator/macAddressValidator");

const {
	privateIDValidator,
	privateIDValidation,
} = require("~/validator/userValidator/privateIDValidator");

const {
	usernameValidator,
	usernameValidation,
} = require("~/validator/userValidator/usernameValidator");

const {
	verificationCodeValidator,
	verificationCodeValidation,
} = require("~/validator/userValidator/verificationCodeValidator");

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
