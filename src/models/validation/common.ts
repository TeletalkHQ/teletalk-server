import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

const createdAt = {
  createdAt: validationModelBuilder
    .create()
    .setModel(nativeModels.createdAt)
    .type()
    .required()
    .empty()
    .build(),
};

const commonValidationModels = { createdAt };

export { commonValidationModels };
