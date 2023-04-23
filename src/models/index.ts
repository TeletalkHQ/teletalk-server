import { databaseModels } from "@/models/database";
import { nativeModels } from "@/models/native";
import { validationModels } from "@/models/validation";

const models = {
  database: databaseModels,
  native: nativeModels,
  validation: validationModels,
};

export { models };
