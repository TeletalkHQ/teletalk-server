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
      numeric: verificationCodeModel.numeric.value,
      empty: verificationCodeModel.empty.value,
      messages: {
        string: verificationCodeModel.type.error.message,
        length: verificationCodeModel.length.error.message,
        stringEmpty: verificationCodeModel.empty.error.message,
        stringNumeric: verificationCodeModel.numeric.error.message,
      },
    },
  },

  info: { version: "1.0.0" },
};

module.exports = { verificationCodeValidationModel };
