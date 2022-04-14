const {
  commonModel: {
    properties: {
      commonCreatedAtModel: { properties: commonCreatedAtModel },
    },
  },
} = require("~/models/commonModels/commonModel");

const createdAtValidationModel = {
  properties: {
    createdAt: {
      type: commonCreatedAtModel.type.value,
      optimal: !commonCreatedAtModel.required.value,
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { createdAtValidationModel };
