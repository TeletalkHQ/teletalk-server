const {
  userModel: {
    properties: {
      verificationCodeModel: { properties: verificationCodeModel },
    },
  },
} = require("~/models/userModels/userModel");

const verificationCodeValidationModel = {
  properties: {
    verificationCode: {
      type: verificationCodeModel.type.value,
      length: verificationCodeModel.length.value,
      trim: verificationCodeModel.trim.value,
      messages: {
        string: verificationCodeModel.type.error.message,
        length: verificationCodeModel.length.error.message,
      },
    },
  },

  info: { version: "1.0.0" },
};

module.exports = { verificationCodeValidationModel };
