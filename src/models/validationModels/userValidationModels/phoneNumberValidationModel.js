const {
  userModel: {
    properties: {
      phoneNumberModel: { properties: phoneNumberModel },
    },
  },
} = require("~/models/userModels/userModel");

const phoneNumberValidationModel = {
  properties: {
    phoneNumber: {
      type: phoneNumberModel.type.value,
      // unique: phoneNumber.unique.value,
      min: phoneNumberModel.minlength.value,
      max: phoneNumberModel.maxlength.value,
      numeric: phoneNumberModel.numeric.value,
      messages: {
        string: phoneNumberModel.type.error.message,
        // unique: phoneNumber.unique.error.message,
        required: phoneNumberModel.required.error.message,
        stringMin: phoneNumberModel.minlength.error.message,
        stringMax: phoneNumberModel.maxlength.error.message,
        stringNumeric: phoneNumberModel.numeric.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { phoneNumberValidationModel };
