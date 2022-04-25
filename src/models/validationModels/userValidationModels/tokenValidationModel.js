const {
  userModel: {
    properties: {
      tokenModel: { properties: tokenModel },
    },
  },
} = require("~/models/userModels/userModel");

const tokenValidationModel = {
  properties: {
    token: {
      type: tokenModel.type.value,
      messages: {
        string: tokenModel.type.error.message,
        required: tokenModel.required.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { tokenValidationModel };
