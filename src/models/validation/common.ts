import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

import { ValidationPicker } from "@/types";

type CommonValidationModels = ValidationPicker<"createdAt" | "clientId" | "id">;

export const commonValidationModels: CommonValidationModels = {
  clientId: validationModelBuilder
    .create("clientId")
    .setModel(nativeModels.clientId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .unique()
    .trim()
    .build(),
  createdAt: validationModelBuilder
    .create("createdAt")
    .setModel(nativeModels.createdAt)
    .type()
    .required()
    .empty()
    .build(),
  id: validationModelBuilder
    .create("id")
    .setModel(nativeModels.userId)
    .required()
    .type()
    .empty()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
};
