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
  phoneNumberValidationModel,
} = require("~/models/validationModels/userValidationModels/phoneNumberValidationModel");

const {
  countryCodeValidationModel,
} = require("~/models/validationModels/userValidationModels/countryCodeValidationModel");
const {
  countryNameValidationModel,
} = require("~/models/validationModels/userValidationModels/countryNameValidationModel");

const {
  userErrors: {
    properties: { CELLPHONE_REQUIRED, CELLPHONE_INVALID },
  },
} = require("~/variables/errors/userErrors");

const cellphoneValidation = {
  properties: {
    ...phoneNumberValidationModel.properties,
    ...countryCodeValidationModel.properties,
    ...countryNameValidationModel.properties,
  },

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(cellphoneValidation.properties);

const cellphoneValidator = async (cellphone = {}) => {
  const { countryCode, countryName, phoneNumber } = cellphone;

  errorThrower(!phoneNumber && !countryCode && !countryName, () => {
    const { statusCode, ...error } = getErrorObject(CELLPHONE_REQUIRED);

    return {
      cellphoneValidation: {
        ...error,
      },
      statusCode,
    };
  });

  await phoneNumberValidator(phoneNumber);
  await countryCodeValidator(countryCode);
  await countryNameValidator(countryName);

  const result = await v(cellphone);

  errorThrower(result !== true, () => {
    const { statusCode, ...error } = getErrorObject(CELLPHONE_INVALID);

    return {
      cellphoneValidation: {
        validatedCellphoneErrors: result,
        ...error,
      },
      statusCode,
    };
  });

  return true;
};

module.exports = { cellphoneValidator, cellphoneValidation };
