const {
  userModel: {
    properties: {
      macAddressModel: { properties: macAddressModel },
    },
  },
} = require("~/models/userModels/userModel");

const macAddressValidationModel = {
  properties: {
    macAddress: {
      type: macAddressModel.type.value,
      unique: macAddressModel.unique.value,
      min: macAddressModel.minlength.value,
      max: macAddressModel.maxlength.value,
      trim: macAddressModel.trim.value,
      messages: {
        string: macAddressModel.type.error.message,
        unique: macAddressModel.unique.error.message,
        required: macAddressModel.required.error.message,
        stringMin: macAddressModel.minlength.error.message,
        stringMax: macAddressModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { macAddressValidationModel };
