import { nativeModelBuilder } from "~/classes/NativeModelBuilder";
import { CreatedAt, Id } from "~/types";

export const commonModels = {
  createdAt: nativeModelBuilder
    .create<CreatedAt>()
    .type("number")
    .required(true)
    .empty(false)
    .build(),
  id: nativeModelBuilder
    .create<Id>()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(30)
    .maxLength(35)
    .trim(true)
    .unique(true)
    .build(),
};
