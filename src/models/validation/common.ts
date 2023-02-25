const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { nativeModels } = require("@/models/native");

const createdAt = {
  createdAt: validationModelBuilder
    .create()
    .setModel(nativeModels.common.createdAt)
    .type()
    .required()
    .empty()
    .build(),
};

const commonValidationModels = { createdAt };

module.exports = { commonValidationModels };
