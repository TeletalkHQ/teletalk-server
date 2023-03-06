import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

const createdAt = validationModelBuilder
  .create()
  .setModel(nativeModels.common.createdAt)
  .type()
  .required()
  .empty()
  .build();

const commonValidationModels = { createdAt };

export { commonValidationModels };
