import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";
import { NativeModelPicker } from "@/types";

type CommonModels = NativeModelPicker<
  "chatId" | "clientId" | "createdAt" | "messageId" | "userId"
>;

export const commonModels: CommonModels = {
  chatId: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(30)
    .maxLength(35)
    .trim(true)
    .unique(true)
    .build(),
  clientId: nativeModelBuilder
    .create()
    .type("string")
    .empty(false)
    .required(true)
    .minLength(40)
    .maxLength(50)
    .unique(true)
    .trim(true)
    .build(),
  createdAt: nativeModelBuilder
    .create()
    .type("number")
    .required(true)
    .empty(false)
    .build(),
  messageId: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .maxLength(45)
    .minLength(40)
    .trim(true)
    .unique(true)
    .build(),
  userId: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(30)
    .maxLength(35)
    .trim(true)
    .unique(true)
    .build(),
};
