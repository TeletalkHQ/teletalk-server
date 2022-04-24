const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  cellphoneValidation: { properties: cellphoneValidation },
} = require("~/validators/userValidators/cellphoneValidator");
const {
  firstNameValidation: { properties: firstNameValidation },
} = require("~/validators/userValidators/firstNameValidator");
const {
  lastNameValidation: { properties: lastNameValidation },
} = require("~/validators/userValidators/lastNameValidator");

const contactValidation = {
  properties: {
    ...cellphoneValidation,
    ...firstNameValidation,
    ...lastNameValidation,
  },

  info: {
    version: "1.0.0",
  },
};

const contactValidator = validatorCompiler(contactValidation.properties);

module.exports = { contactValidator, contactValidation };
