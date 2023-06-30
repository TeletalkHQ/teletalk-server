import { validationModelBuilder } from "~/classes/modelBuilder/ValidationModelBuilder";
import { nativeModels } from "~/models/native";
import { ValidationCollection } from "~/types";
import { Field } from "~/types/models";

export const validationModels: ValidationCollection = Object.keys(
  nativeModels
).reduce((prevValue, currValue) => {
  const model = nativeModels[currValue as Field];

  const builder = validationModelBuilder
    .create(currValue as Field)
    .setModel(model);

  if ("empty" in model) builder.empty();
  if ("length" in model) builder.length();
  if ("maxLength" in model) builder.max();
  if ("minLength" in model) builder.min();
  if ("numeric" in model) builder.numeric();
  if ("required" in model) builder.required();
  if ("trim" in model) builder.trim();
  if ("type" in model) builder.type();
  if ("unique" in model) builder.unique();

  prevValue[currValue as Field] = builder.build();
  return prevValue;
}, {} as ValidationCollection);
