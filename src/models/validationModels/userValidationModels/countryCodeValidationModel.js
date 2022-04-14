const {
  userModel: {
    properties: {
      countryCodeModel: { properties: countryCodeModel },
    },
  },
} = require("~/models/userModels/userModel");

const countryCodeValidationModel = {
  properties: {
    countryCode: {
      type: countryCodeModel.type.value,
      min: countryCodeModel.minlength.value,
      max: countryCodeModel.maxlength.value,
      trim: countryCodeModel.trim.value,
      messages: {
        string: countryCodeModel.type.error.message,
        required: countryCodeModel.required.error.message,
        stringMin: countryCodeModel.minlength.error.message,
        stringMax: countryCodeModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { countryCodeValidationModel };
