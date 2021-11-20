const Validator = require("fastest-validator");

const { cellphoneValidation } = require("./cellphoneValidator");
const { firstNameValidation } = require("./firstNameValidator");
const { lastNameValidation } = require("./lastNameValidator");

const v = new Validator();

const contactValidation = {
	...cellphoneValidation,
	...firstNameValidation,
	...lastNameValidation,
};

const contactValidator = v.compile(contactValidation);

module.exports = { contactValidator, contactValidation };
