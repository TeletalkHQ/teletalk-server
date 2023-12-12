import { databaseModels } from "~/models/database";
import { nativeModels } from "~/models/native";
import { validationModels } from "~/models/validation";

export const models = {
  database: databaseModels,
  native: nativeModels,
  validation: validationModels,
};
