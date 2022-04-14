const {
  userModel: {
    properties: {
      firstNameModel: { properties: firstName },
    },
  },
} = require("~/models/userModels/user.model");

const firstNameValidationModel = {
  properties: {
    firstName: {
      type: firstName.type.value,
      min: firstName.minlength.value,
      max: firstName.maxlength.value,
      trim: firstName.trim.value,
      messages: {
        string: firstName.type.error.message,
        required: firstName.required.error.message,
        stringMin: firstName.minlength.error.message,
        stringMax: firstName.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { firstNameValidationModel };
