import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

import { ValidationModel, ValidationPicker } from "@/types";

const createdAt: ValidationModel<"createdAt"> = {
  createdAt: validationModelBuilder
    .create()
    .setModel(nativeModels.createdAt)
    .type()
    .required()
    .empty()
    .build(),
};

const clientId: ValidationModel<"clientId"> = {
  clientId: validationModelBuilder
    .create()
    .setModel(nativeModels.clientId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .unique()
    .trim()
    .build(),
};

type CommonValidationModels = ValidationPicker<"createdAt" | "clientId">;

export const commonValidationModels: CommonValidationModels = {
  clientId,
  createdAt,
};
