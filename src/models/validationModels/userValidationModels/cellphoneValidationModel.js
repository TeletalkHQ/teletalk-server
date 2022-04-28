const {
  countryCodeValidationModel: {
    properties: { countryCode },
  },
} = require("./countryCodeValidationModel");
const {
  countryNameValidationModel: {
    properties: { countryName },
  },
} = require("./countryNameValidationModel");
const {
  phoneNumberValidationModel: {
    properties: { phoneNumber },
  },
} = require("./phoneNumberValidationModel");

const cellphoneValidationModel = {
  properties: {
    countryCode,
    countryName,
    phoneNumber,
  },

  info: {},
};

module.exports = { cellphoneValidationModel };
