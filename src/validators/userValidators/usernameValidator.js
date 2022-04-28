const {
  validatorErrorTypes,
  getErrorObject,
  errorThrower,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  usernameValidationModel: { properties: usernameValidationModel },
} = require("~/models/validationModels/userValidationModels/usernameValidationModel");
const {
  userErrors: {
    properties: {
      USERNAME_INVALID: { properties: USERNAME_INVALID },
      USERNAME_REQUIRED: { properties: USERNAME_REQUIRED },
      USERNAME_INVALID_TYPE: { properties: USERNAME_INVALID_TYPE },
      USERNAME_MINLENGTH_REACH: { properties: USERNAME_MINLENGTH_REACH },
      USERNAME_MAXLENGTH_REACH: { properties: USERNAME_MAXLENGTH_REACH },
    },
  },
} = require("~/variables/errors/userErrors");

const usernameValidation = {
  properties: usernameValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(usernameValidation.properties);

const usernameValidator = async (username) => {
  const result = await v({ username });

  if (result === true) return { done: true };

  const { string, stringMax, stringMin, required } =
    validatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedUsername: username,
      validationResult: result,
    });

  errorThrower(required, () => errorObject(USERNAME_REQUIRED));

  errorThrower(string, () => errorObject(USERNAME_INVALID_TYPE));

  errorThrower(stringMin, () => errorObject(USERNAME_MINLENGTH_REACH));

  errorThrower(stringMax, () => errorObject(USERNAME_MAXLENGTH_REACH));

  errorThrower(result !== true, () => errorObject(USERNAME_INVALID));

  return { done: false, error: result };
};

module.exports = { usernameValidator, usernameValidation };
