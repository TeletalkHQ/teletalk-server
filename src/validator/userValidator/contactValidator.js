const Validator = require("fastest-validator");

const { cellphoneValidation } = require("~/validator/userValidator/cellphoneValidator");
const { firstNameValidation } = require("~/validator/userValidator/firstNameValidator");
const { lastNameValidation } = require("~/validator/userValidator/lastNameValidator");

const v = new Validator();

const contactValidation = {
	properties: {
		...cellphoneValidation.properties,
		...firstNameValidation.properties,
		...lastNameValidation.properties,
	},

	info: {
		version: "1.0.0",
	},
};

const contactValidator = v.compile(contactValidation.properties);

module.exports = { contactValidator, contactValidation };
