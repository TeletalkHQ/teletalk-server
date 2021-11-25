const Validator = require("fastest-validator");

const { cellphoneValidation } = require("../userPartValidator/cellphoneValidator");
const { countryCodeValidation } = require("../userPartValidator/countryCodeValidator");
const { countryNameValidation } = require("../userPartValidator/countryNameValidator");
const { firstNameValidation } = require("../userPartValidator/firstNameValidator");
const { lastNameValidation } = require("../userPartValidator/lastNameValidator");

const v = new Validator();

const contactValidation = {
	...cellphoneValidation,
	...countryCodeValidation,
	...countryNameValidation,
	...firstNameValidation,
	...lastNameValidation,
};

const contactValidator = v.compile(contactValidation);

module.exports = { contactValidator };
