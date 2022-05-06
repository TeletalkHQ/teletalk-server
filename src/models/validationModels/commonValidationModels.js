const {
  versionCalculator,
  extractVersions,
  extractFromInfo,
} = require("@/functions/utilities/utilsNoDeps");
const {
  commonModels: {
    properties: {
      createdAtCommonModel: { properties: commonCreatedAtModel },
    },
  },
} = require("@/models/commonModels/commonModels");

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

const models = { createdAtValidationModel };

const commonValidationModels = {
  properties: models,

  info: {
    version: versionCalculator(extractVersions(extractFromInfo(models))),
  },
};

module.exports = { commonValidationModels };
