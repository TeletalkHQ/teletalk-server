const Validator = require("fastest-validator");

const { cellphoneValidation } = require("~/validator/userPartValidator/cellphoneValidator");
const { firstNameValidation } = require("~/validator/userPartValidator/firstNameValidator");
const { lastNameValidation } = require("~/validator/userPartValidator/lastNameValidator");

const v = new Validator();

const contactValidation = {
	...cellphoneValidation,
	...firstNameValidation,
	...lastNameValidation,
};

const contactValidator = v.compile(contactValidation);

module.exports = { contactValidator, contactValidation };
