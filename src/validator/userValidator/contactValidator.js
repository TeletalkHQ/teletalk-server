const Validator = require("fastest-validator");

const { cellphoneValidation } = require("~/validator/userValidator/cellphoneValidator");
const { firstNameValidation } = require("~/validator/userValidator/firstNameValidator");
const { lastNameValidation } = require("~/validator/userValidator/lastNameValidator");

const v = new Validator();

const contactValidation = {
	...cellphoneValidation,
	...firstNameValidation,
	...lastNameValidation,
};

const contactValidator = v.compile(contactValidation);

module.exports = { contactValidator, contactValidation };
