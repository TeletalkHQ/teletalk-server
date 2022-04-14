const {
  userModel: {
    privateIDModel: { properties: privateID },
  },
} = require("~/models/userModels/user.model");

const privateIDValidationModel = {
  properties: {
    privateID: {
      type: privateID.type.value,
      unique: privateID.unique.value,
      min: privateID.minlength.value,
      max: privateID.maxlength.value,
      trim: privateID.trim.value,
      messages: {
        string: privateID.type.error.message,
        required: privateID.required.error.message,
        unique: privateID.unique.error.message,
        stringMin: privateID.minlength.error.message,
        stringMax: privateID.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { privateIDValidationModel };
