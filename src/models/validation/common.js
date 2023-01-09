const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { nativeModels } = require("@/models/native");

const createdAt = {
  createdAt: validationModelBuilder
    .create()
    .setModelObject(nativeModels.common.createdAt)
    .type()
    .build(),
};

const commonValidationModels = { createdAt };

module.exports = { commonValidationModels };
