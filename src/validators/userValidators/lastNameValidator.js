const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  lastNameValidationModel: { properties: lastNameValidationModel },
} = require("~/models/validationModels/userValidationModels/lastNameValidationModel");

const lastNameValidation = {
  properties: lastNameValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(lastNameValidation.properties);

const lastNameValidator = async (lastName) => {
  const result = await v({ lastName });

  return result;
};

module.exports = { lastNameValidator, lastNameValidation };
