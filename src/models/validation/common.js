const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { nativeModels } = require("@/models/native/native");

const createdAt = {
  createdAt: validationModelBuilder
    .create()
    .setModelObject(nativeModels.common.createdAt)
    .type()
    .optional()
    .build(),
  version: "1.0.0",
};

const validationModels = { createdAt };

const common = {
  ...validationModels,
  version: versionCalculator(extractVersions(validationModels)),
};

module.exports = { common };
