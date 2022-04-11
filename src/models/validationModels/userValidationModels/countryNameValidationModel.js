const {
  userModel: {
    countryName: { properties: countryName },
  },
} = require("~/models/userModels/user.model");

const countryNameValidationModel = {
  properties: {
    countryName: {
      type: countryName.type.value,
      min: countryName.minlength.value,
      max: countryName.maxlength.value,
      messages: {
        string: countryName.type.error.message,
        required: countryName.required.error.message,
        stringMin: countryName.minlength.error.message,
        stringMax: countryName.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { countryNameValidationModel };
