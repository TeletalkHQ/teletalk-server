const {
  userModel: {
    verificationCodeModel: { properties: verificationCode },
  },
} = require("~/models/userModels/user.model");

const verificationCodeValidationModel = {
  properties: {
    verificationCode: {
      type: verificationCode.type.value,
      length: verificationCode.length.value,
      trim: verificationCode.trim.value,
      messages: {
        string: verificationCode.type.error.message,
        length: verificationCode.length.error.message,
      },
    },
  },

  info: { version: "1.0.0" },
};

module.exports = { verificationCodeValidationModel };
