import { nativeModelBuilder } from "~/classes/modelBuilder/NativeModelBuilder";

import { UserId, CreatedAt } from "~/types";

export const commonModels = {
  createdAt: nativeModelBuilder
    .create<CreatedAt>()
    .type("number")
    .required(true)
    .empty(false)
    .build(),
  id: nativeModelBuilder
    //REFACTOR: Use Id interface
    .create<UserId>()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(30)
    .maxLength(35)
    .trim(true)
    .unique(true)
    .build(),
};
