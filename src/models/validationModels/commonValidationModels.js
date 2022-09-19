const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const {
  commonModels: { createdAtCommonModel },
} = require("@/models/dataModels/commonModels");

const createdAtValidationModel = {
  createdAt: validationModelBuilder
    .create()
    .setModelObject(createdAtCommonModel)
    .type()
    .optional()
    .build(),
  version: "1.0.0",
};

const models = { createdAtValidationModel };

const commonValidationModels = {
  ...models,
  version: versionCalculator(extractVersions(models)),
};

module.exports = { commonValidationModels };
