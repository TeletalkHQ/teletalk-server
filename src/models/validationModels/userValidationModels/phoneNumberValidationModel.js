const {
  userModel: {
    phoneNumberModel: { properties: phoneNumber },
  },
} = require("~/models/userModels/user.model");

const phoneNumberValidationModel = {
  properties: {
    phoneNumber: {
      type: phoneNumber.type.value,
      // unique: phoneNumber.unique.value,
      min: phoneNumber.minlength.value,
      max: phoneNumber.maxlength.value,
      messages: {
        string: phoneNumber.type.error.message,
        // unique: phoneNumber.unique.error.message,
        required: phoneNumber.required.error.message,
        stringMin: phoneNumber.minlength.error.message,
        stringMax: phoneNumber.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { phoneNumberValidationModel };
