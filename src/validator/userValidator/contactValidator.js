const Validator = require("fastest-validator");

const { cellphoneValidation } = require("../userPartValidator/cellphoneValidator");
const { firstNameValidation } = require("../userPartValidator/firstNameValidator");
const { lastNameValidation } = require("../userPartValidator/lastNameValidator");

const v = new Validator();

const contactValidation = {
	...cellphoneValidation,
	...firstNameValidation,
	...lastNameValidation,
};

const contactValidator = v.compile(contactValidation);

module.exports = { contactValidator };
