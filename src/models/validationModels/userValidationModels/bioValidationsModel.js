const {
  userModel: {
    properties: {
      bioModel: { properties: bioModel },
    },
  },
} = require("~/models/userModels/userModel");

const bioValidationsModel = {
  properties: {
    bio: {
      type: bioModel.type.value,
      optional: !bioModel.required.value,
      max: bioModel.maxlength.value,
      messages: {
        string: bioModel.type.error.message,
        stringMax: bioModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { bioValidationsModel };
