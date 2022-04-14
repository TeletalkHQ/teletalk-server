const {
  userModel: {
    properties: {
      firstNameModel: { properties: firstNameModel },
    },
  },
} = require("~/models/userModels/userModel");

const firstNameValidationModel = {
  properties: {
    firstName: {
      type: firstNameModel.type.value,
      min: firstNameModel.minlength.value,
      max: firstNameModel.maxlength.value,
      trim: firstNameModel.trim.value,
      messages: {
        string: firstNameModel.type.error.message,
        required: firstNameModel.required.error.message,
        stringMin: firstNameModel.minlength.error.message,
        stringMax: firstNameModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { firstNameValidationModel };
