import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { commonModels } from "@/models/native/common";
import { NativeModelPicker } from "@/types";

type PrivateChatModels = NativeModelPicker<
  | "chatId"
  | "createdAt"
  | "messageId"
  | "messages"
  | "messageText"
  | "participantId"
  | "participants"
  | "privateChats"
  | "senderId"
>;

export const privateChatModels: PrivateChatModels = {
  chatId: commonModels.chatId,
  createdAt: commonModels.createdAt,
  messageId: commonModels.messageId,
  messages: nativeModelBuilder
    .create()
    .type("array")
    .required(true)
    .empty(true)
    .build(),
  messageText: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(1)
    .maxLength(1000)
    .trim(true)
    .build(),
  participantId: nativeModelBuilder
    .create()
    .type(commonModels.userId.type)
    .required(commonModels.userId.required)
    .empty(commonModels.userId.empty)
    .minLength(commonModels.userId.minLength)
    .maxLength(commonModels.userId.maxLength)
    .trim(commonModels.userId.trim)
    .unique(commonModels.userId.unique)
    .build(),
  participants: nativeModelBuilder
    .create()
    .type("array")
    .required(true)
    .length(2)
    .empty(false)
    .build(),
  privateChats: nativeModelBuilder
    .create()
    .type("array")
    .required(true)
    .build(),
  senderId: nativeModelBuilder
    .create()
    .type(commonModels.userId.type)
    .required(commonModels.userId.required)
    .empty(commonModels.userId.empty)
    .minLength(commonModels.userId.minLength)
    .maxLength(commonModels.userId.maxLength)
    .trim(commonModels.userId.trim)
    .unique(commonModels.userId.unique)
    .build(),
};
