const {
  errorThrower,
  getErrorObject,
  validatorErrorFinder,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  firstNameValidationModel: { properties: firstNameValidationModel },
} = require("~/models/validationModels/userValidationModels/firstNameValidationModel");

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

  const finder = (value) => validatorErrorFinder(result, value);

  if (result === true) return { done: true };

  errorThrower(finder(values.required), () =>
    getErrorObject(FIRST_NAME_REQUIRED, {
      validatedFirstName: firstName,
      validationResult: result,
    })
  );

  errorThrower(finder(values.string), () =>
    getErrorObject(FIRST_NAME_INVALID_TYPE, {
      validatedFirstName: firstName,
      validationResult: result,
    })
  );

  errorThrower(finder(values.minlength), () =>
    getErrorObject(FIRST_NAME_MINLENGTH_REACH, {
      validatedFirstName: firstName,
      validationResult: result,
    })
  );

  errorThrower(finder(values.maxlength), () =>
    getErrorObject(FIRST_NAME_MAXLENGTH_REACH, {
      validatedFirstName: firstName,
      validationResult: result,
    })
  );

  return result;
};

module.exports = { firstNameValidator, firstNameValidation };
