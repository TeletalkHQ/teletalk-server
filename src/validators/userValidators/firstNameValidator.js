const {
  errorThrower,
  getErrorObject,
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
  const finder = (prop, value) => result.find((r) => r[prop] === value);

  if (result === true) return { done: true };

  errorThrower(finder("type", "required"), () =>
    getErrorObject(FIRST_NAME_REQUIRED, {
      validatedFirstName: firstName,
      validationResult: result,
    })
  );

  errorThrower(finder("type", "string"), () =>
    getErrorObject(FIRST_NAME_INVALID_TYPE, {
      validatedFirstName: firstName,
      validationResult: result,
    })
  );

  errorThrower(finder("type", "stringMin"), () =>
    getErrorObject(FIRST_NAME_MINLENGTH_REACH, {
      validatedFirstName: firstName,
      validationResult: result,
    })
  );

  errorThrower(finder("type", "stringMax"), () =>
    getErrorObject(FIRST_NAME_MAXLENGTH_REACH, {
      validatedFirstName: firstName,
      validationResult: result,
    })
  );

  return result;
};

module.exports = { firstNameValidator, firstNameValidation };
