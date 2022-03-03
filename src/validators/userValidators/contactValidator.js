const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  cellphoneValidation,
} = require("~/validators/userValidators/cellphoneValidator");
const {
  firstNameValidation,
} = require("~/validators/userValidators/firstNameValidator");
const {
  lastNameValidation,
} = require("~/validators/userValidators/lastNameValidator");

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
