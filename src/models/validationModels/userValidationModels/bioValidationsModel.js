const {
  userModel: {
    properties: {
      bioModel: { properties: bio },
    },
  },
} = require("~/models/userModels/userModel");

const bioValidationsModel = {
  properties: {
    bio: {
      type: bio.type.value,
      optional: !bio.required.value,
      max: bio.maxlength.value,
      messages: {
        string: bio.type.error.message,
        stringMax: bio.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { bioValidationsModel };
