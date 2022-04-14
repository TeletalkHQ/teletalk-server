const {
  userModel: {
    properties: {
      usernameModel: { properties: usernameModel },
    },
  },
} = require("~/models/userModels/userModel");

const usernameValidationModel = {
  properties: {
    username: {
      type: usernameModel.type.value,
      optional: !usernameModel.required.value,
      unique: usernameModel.unique.value,
      max: usernameModel.maxlength.value,
      trim: usernameModel.trim.value,
      lowercase: usernameModel.lowercase.value,
      messages: {
        string: usernameModel.type.error.message,
        unique: usernameModel.unique.error.message,
        stringMax: usernameModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { usernameValidationModel };
