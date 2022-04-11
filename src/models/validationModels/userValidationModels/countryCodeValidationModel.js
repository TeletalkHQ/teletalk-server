const {
  userModel: {
    countryCode: { properties: countryCode },
  },
} = require("~/models/userModels/user.model");

const countryCodeValidationModel = {
  properties: {
    countryCode: {
      type: countryCode.type.value,
      min: countryCode.minlength.value,
      max: countryCode.maxlength.value,
      trim: countryCode.trim.value,
      messages: {
        string: countryCode.type.error.message,
        required: countryCode.required.error.message,
        stringMin: countryCode.minlength.error.message,
        stringMax: countryCode.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { countryCodeValidationModel };
