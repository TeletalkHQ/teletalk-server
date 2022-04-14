const {
  commonModel: {
    createdAt: { properties: createdAt },
  },
} = require("~/models/commonModels/commonModel");

const createdAtValidationModel = {
  properties: {
    createdAt: {
      type: createdAt.type.value,
      optimal: !createdAt.required.value,
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { createdAtValidationModel };
