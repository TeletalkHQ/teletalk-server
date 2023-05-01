import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { ChatId, ClientId, MessageId, UserId, CreatedAt } from "@/types";

export const commonModels = {
  chatId: nativeModelBuilder
    .create<ChatId>()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(30)
    .maxLength(35)
    .trim(true)
    .unique(true)
    .build(),
  clientId: nativeModelBuilder
    .create<ClientId>()
    .type("string")
    .empty(false)
    .required(true)
    .minLength(40)
    .maxLength(50)
    .unique(true)
    .trim(true)
    .build(),
  createdAt: nativeModelBuilder
    .create<CreatedAt>()
    .type("number")
    .required(true)
    .empty(false)
    .build(),
  messageId: nativeModelBuilder
    .create<MessageId>()
    .type("string")
    .required(true)
    .empty(false)
    .maxLength(45)
    .minLength(40)
    .trim(true)
    .unique(true)
    .build(),
  userId: nativeModelBuilder
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
