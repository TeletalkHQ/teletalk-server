const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const { cellphoneValidation } = require("~/validator/userValidator/cellphoneValidator");
const { firstNameValidation } = require("~/validator/userValidator/firstNameValidator");
const { lastNameValidation } = require("~/validator/userValidator/lastNameValidator");

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

const contactValidator = validatorCompiler(contactValidation.properties);

module.exports = { contactValidator, contactValidation };
