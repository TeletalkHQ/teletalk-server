import { validationModelBuilder } from "@/classes/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

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

export { commonValidationModels };
