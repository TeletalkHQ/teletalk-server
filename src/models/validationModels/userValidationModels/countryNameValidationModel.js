const {
  userModel: {
    properties: {
      countryNameModel: { properties: countryNameModel },
    },
  },
} = require("~/models/userModels/userModel");

const countryNameValidationModel = {
  properties: {
    countryName: {
      type: countryNameModel.type.value,
      min: countryNameModel.minlength.value,
      max: countryNameModel.maxlength.value,
      messages: {
        string: countryNameModel.type.error.message,
        required: countryNameModel.required.error.message,
        stringMin: countryNameModel.minlength.error.message,
        stringMax: countryNameModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { countryNameValidationModel };
