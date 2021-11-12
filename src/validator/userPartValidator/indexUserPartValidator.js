const {
	bioValidator,
	bioValidation,
} = require("~/validator/userPartValidator/bioValidator");
const {
	cellphoneValidator,
	cellphoneValidation,
} = require("~/validator/userPartValidator/cellphoneValidator");
const {
	countryCodeValidator,
	countryCodeValidation,
} = require("~/validator/userPartValidator/countryCodeValidator");
const {
	countryNameValidator,
	countryNameValidation,
} = require("~/validator/userPartValidator/countryNameValidator");
const {
	createdAtValidator,
	createdAtValidation,
} = require("~/validator/userPartValidator/createdAtValidator");
const {
	firstNameValidator,
	firstNameValidation,
} = require("~/validator/userPartValidator/firstNameValidator");
const {
	lastNameValidator,
	lastNameValidation,
} = require("~/validator/userPartValidator/lastNameValidator");
const {
	macAddressValidator,
	macAddressValidation,
} = require("~/validator/userPartValidator/macAddressValidator");
const {
	privateIDValidator,
	privateIDValidation,
} = require("~/validator/userPartValidator/privateIDValidator");
const {
	usernameValidator,
	usernameValidation,
} = require("~/validator/userPartValidator/usernameValidator");
const {
	verificationCodeValidator,
	verificationCodeValidation,
} = require("~/validator/userPartValidator/verificationCodeValidator");

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
