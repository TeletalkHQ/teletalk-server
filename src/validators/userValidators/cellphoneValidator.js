const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");
const {
  getErrorObject,
  errorThrower,
} = require("~/functions/utilities/utilsNoDeps");

const {
  phoneNumberValidator,
} = require("~/validators/userValidators/phoneNumberValidator");
const {
  countryCodeValidator,
} = require("~/validators/userValidators/countryCodeValidator");
const {
  countryNameValidator,
} = require("~/validators/userValidators/countryNameValidator");

const {
  phoneNumberValidationModel: { properties: phoneNumberValidationModel },
} = require("~/models/validationModels/userValidationModels/phoneNumberValidationModel");

const {
  countryCodeValidationModel: { properties: countryCodeValidationModel },
} = require("~/models/validationModels/userValidationModels/countryCodeValidationModel");
const {
  countryNameValidationModel: { properties: countryNameValidationModel },
} = require("~/models/validationModels/userValidationModels/countryNameValidationModel");

const {
  userErrors: {
    properties: {
      CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
      CELLPHONE_INVALID: { properties: CELLPHONE_INVALID },
    },
  },
} = require("~/variables/errors/userErrors");

const cellphoneValidation = {
  properties: {
    ...phoneNumberValidationModel,
    ...countryCodeValidationModel,
    ...countryNameValidationModel,
  },

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(cellphoneValidation.properties);

const cellphoneValidator = async (cellphone = {}) => {
  const { countryCode, countryName, phoneNumber } = cellphone;

  errorThrower(!phoneNumber && !countryCode && !countryName, () => {
    return getErrorObject(CELLPHONE_REQUIRED);
  });

  await phoneNumberValidator(phoneNumber);
  await countryCodeValidator(countryCode);
  await countryNameValidator(countryName);

  const result = await v(cellphone);

  errorThrower(result !== true, () => {
    return getErrorObject(CELLPHONE_INVALID, {
      validatedCellphoneErrors: result,
    });
  });

  return true;
};

module.exports = { cellphoneValidator, cellphoneValidation };
