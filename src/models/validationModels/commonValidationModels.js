const {
  commonModels: {
    properties: {
      createdAtCommonModel: { properties: commonCreatedAtModel },
    },
  },
} = require("~/models/commonModels/commonModels");

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

const commonValidationModels = {
  properties: { createdAtValidationModel },

  info: { version: "1.0.0" },
};

module.exports = { commonValidationModels };
