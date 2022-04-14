const {
  userModel: {
    properties: {
      lastNameModel: { properties: lastNameModel },
    },
  },
} = require("~/models/userModels/userModel");

const lastNameValidationModel = {
  properties: {
    lastName: {
      type: lastNameModel.type.value,
      optional: !lastNameModel.required.value,
      max: lastNameModel.maxlength.value,
      trim: lastNameModel.trim.value,
      messages: {
        string: lastNameModel.type.error.message,
        stringMax: lastNameModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { lastNameValidationModel };
