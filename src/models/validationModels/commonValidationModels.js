const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const {
  commonModels: { createdAtCommonModel },
} = require("@/models/commonModels/commonModels");

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
