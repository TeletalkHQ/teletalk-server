const {
  userModel: {
    properties: {
      privateIdModel: { properties: privateIdModel },
    },
  },
} = require("~/models/userModels/userModel");

const privateIdValidationModel = {
  properties: {
    privateId: {
      type: privateIdModel.type.value,
      unique: privateIdModel.unique.value,
      min: privateIdModel.minlength.value,
      max: privateIdModel.maxlength.value,
      trim: privateIdModel.trim.value,
      messages: {
        string: privateIdModel.type.error.message,
        required: privateIdModel.required.error.message,
        unique: privateIdModel.unique.error.message,
        stringMin: privateIdModel.minlength.error.message,
        stringMax: privateIdModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { privateIdValidationModel };
