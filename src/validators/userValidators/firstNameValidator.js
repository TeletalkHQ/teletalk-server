const {
  errorThrower,
  getErrorObject,
  validatorErrorTypes,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  firstNameValidationModel: { properties: firstNameValidationModel },
} = require("~/models/validationModels/userValidationModels/firstNameValidationModel");

const {
  userErrors: {
    properties: {
      FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
      FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
      FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
      FIRST_NAME_INVALID_TYPE: { properties: FIRST_NAME_INVALID_TYPE },
    },
  },
} = require("~/variables/errors/userErrors");

const firstNameValidation = {
  properties: firstNameValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(firstNameValidation.properties);

const firstNameValidator = async (firstName) => {
  const result = await v({ firstName });

  if (result === true) return { done: true };

  const { string, stringMax, stringMin, required } =
    validatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedFirstName: firstName,
      validationResult: result,
    });

  errorThrower(required, () => errorObject(FIRST_NAME_REQUIRED));

  errorThrower(string, () => errorObject(FIRST_NAME_INVALID_TYPE));

  errorThrower(stringMin, () => errorObject(FIRST_NAME_MINLENGTH_REACH));

  errorThrower(stringMax, () => errorObject(FIRST_NAME_MAXLENGTH_REACH));

  return { done: false };
};

module.exports = { firstNameValidator, firstNameValidation };
