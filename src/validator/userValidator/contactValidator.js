const Validator = require("fastest-validator");

const { cellphoneValidation } = require("../userPartValidator/cellphoneValidator");
const { countryCodeValidation } = require("../userPartValidator/countryCodeValidator");
const { countryNameValidation } = require("../userPartValidator/countryNameValidator");

const v = new Validator();

const contactValidation = {
	...cellphoneValidation,
	...countryCodeValidation,
	...countryNameValidation,
};

const contactValidator = v.compile(contactValidation);

module.exports = { contactValidator };
