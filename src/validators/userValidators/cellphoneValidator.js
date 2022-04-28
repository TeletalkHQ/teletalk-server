const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");
const {
  getErrorObject,
  errorThrower,
  getValidatorErrorTypes,
} = require("~/functions/utilities/utilsNoDeps");

const {
  userErrors: {
    properties: {
      CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
      CELLPHONE_INVALID: { properties: CELLPHONE_INVALID },
    },
  },
} = require("~/variables/errors/userErrors");
const {
  cellphoneValidationModel: { properties: cellphoneValidationModel },
} = require("~/models/validationModels/userValidationModels/cellphoneValidationModel");
const { phoneNumberValidator } = require("./phoneNumberValidator");
const { countryCodeValidator } = require("./countryCodeValidator");
const { countryNameValidator } = require("./countryNameValidator");

const cellphoneValidation = {
  properties: cellphoneValidationModel,

  info: {
    version: "1.0.0",
  },
};

// const v = validatorCompiler(cellphoneValidation.properties);

//FIXME cellphoneValidator
const cellphoneValidator = async (cellphone = {}) => {
  try {
    const { countryCode, countryName, phoneNumber } = cellphone;

    errorThrower(!phoneNumber && !countryCode && !countryName, () => {
      return getErrorObject(CELLPHONE_REQUIRED);
    });

    await countryCodeValidator(countryCode);
    await countryNameValidator(countryName);
    await phoneNumberValidator(phoneNumber);
  } catch (error) {
    logger.log("cellphoneValidator catch, error:", error);
    throw error;
  }
};

module.exports = { cellphoneValidator, cellphoneValidation };
