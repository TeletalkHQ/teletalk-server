const {
  errorThrower,
  getErrorObject,
  validatorErrorFinder,
  validatorErrorTypes,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  lastNameValidationModel: { properties: lastNameValidationModel },
} = require("~/models/validationModels/userValidationModels/lastNameValidationModel");

const {
  initialValue: {
    initialValidatorPropValues: {
      type: { values },
    },
  },
} = require("~/variables/constants/initialValues/initialValue");
const {
  userErrors: {
    properties: {
      LAST_NAME_INVALID_TYPE: { properties: LAST_NAME_INVALID_TYPE },
      LAST_NAME_MAXLENGTH_REACH: { properties: LAST_NAME_MAXLENGTH_REACH },
    },
  },
} = require("~/variables/errors/userErrors");

const lastNameValidation = {
  properties: lastNameValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(lastNameValidation.properties);

const lastNameValidator = async (lastName) => {
  const result = await v({ lastName });

  if (result === true) return { done: true };

  const { string, stringMax } = validatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedLastName: lastName,
      validationResult: result,
    });

  errorThrower(string, () => errorObject(LAST_NAME_INVALID_TYPE));

  errorThrower(stringMax, () => errorObject(LAST_NAME_MAXLENGTH_REACH));

  return { done: false, error: result };
};

module.exports = { lastNameValidator, lastNameValidation };
