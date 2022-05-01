const {
  countryCodeValidationModel: {
    properties: { countryCode },
  },
} = require("~/models/validationModels/userValidationModels/countryCodeValidationModel");
const {
  countryNameValidationModel: {
    properties: { countryName },
  },
} = require("~/models/validationModels/userValidationModels/countryNameValidationModel");
const {
  phoneNumberValidationModel: {
    properties: { phoneNumber },
  },
} = require("~/models/validationModels/userValidationModels/phoneNumberValidationModel");

const cellphoneValidationModel = {
  properties: {
    countryCode,
    countryName,
    phoneNumber,
  },

  info: {},
};

module.exports = { cellphoneValidationModel };
