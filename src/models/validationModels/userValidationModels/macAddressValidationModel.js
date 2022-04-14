const {
  userModel: {
    properties: {
      macAddressModel: { properties: macAddress },
    },
  },
} = require("~/models/userModels/user.model");

const macAddressValidationModel = {
  properties: {
    macAddress: {
      type: macAddress.type.value,
      unique: macAddress.unique.value,
      min: macAddress.minlength.value,
      max: macAddress.maxlength.value,
      trim: macAddress.trim.value,
      messages: {
        string: macAddress.type.error.message,
        unique: macAddress.unique.error.message,
        required: macAddress.required.error.message,
        stringMin: macAddress.minlength.error.message,
        stringMax: macAddress.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { macAddressValidationModel };
