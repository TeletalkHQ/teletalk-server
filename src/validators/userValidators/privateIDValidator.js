const {
  validatorErrorTypes,
  getErrorObject,
  errorThrower,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  privateIdValidationModel: { properties: privateIdValidationModel },
} = require("~/models/validationModels/userValidationModels/privateIdValidationModel");
const {
  userErrors: {
    properties: {
      PRIVATE_ID_REQUIRED: { properties: PRIVATE_ID_REQUIRED },
      PRIVATE_ID_INVALID_TYPE: { properties: PRIVATE_ID_INVALID_TYPE },
      PRIVATE_ID_MIN_LENGTH_REACH: { properties: PRIVATE_ID_MIN_LENGTH_REACH },
      PRIVATE_ID_MAX_LENGTH_REACH: { properties: PRIVATE_ID_MAX_LENGTH_REACH },
      PRIVATE_ID_INVALID: { properties: PRIVATE_ID_INVALID },
    },
  },
} = require("~/variables/errors/userErrors");

const privateIdValidation = {
  properties: privateIdValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(privateIdValidation.properties);

const privateIdValidator = async (privateId) => {
  const result = await v({ privateId });

  if (result === true) return { done: true };

  const { string, stringMax, stringMin, required } =
    validatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedPrivateId: privateId,
      validationResult: result,
    });

  errorThrower(required, () => errorObject(PRIVATE_ID_REQUIRED));

  errorThrower(string, () => errorObject(PRIVATE_ID_INVALID_TYPE));

  errorThrower(stringMin, () => errorObject(PRIVATE_ID_MIN_LENGTH_REACH));

  errorThrower(stringMax, () => errorObject(PRIVATE_ID_MAX_LENGTH_REACH));

  errorThrower(result !== true, errorObject(PRIVATE_ID_INVALID));

  return { done: false, error: result };
};

module.exports = { privateIdValidator, privateIdValidation };
