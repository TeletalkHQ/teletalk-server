const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  firstNameValidationModel: { properties: firstNameValidationModel },
} = require("~/models/validationModels/userValidationModels/firstNameValidationModel");

const firstNameValidation = {
  properties: firstNameValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(firstNameValidation.properties);

const firstNameValidator = async (firstName) => {
  const result = await v({ firstName });

  return result;
};

module.exports = { firstNameValidator, firstNameValidation };
