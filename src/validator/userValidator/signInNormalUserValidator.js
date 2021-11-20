const Validator = require("fastest-validator");

const { cellphoneValidation } = require("../userPartValidator/cellphoneValidator");
const { countryCodeValidation } = require("../userPartValidator/countryCodeValidator");
const { countryNameValidation } = require("../userPartValidator/countryNameValidator");

const v = new Validator();

const signInNormalUserValidation = {
	...cellphoneValidation,
	...countryCodeValidation,
	...countryNameValidation,
};

const signInNormalUserValidator = v.compile(signInNormalUserValidation);

module.exports = { signInNormalUserValidator };
