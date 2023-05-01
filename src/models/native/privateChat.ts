import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { commonModels } from "@/models/native/common";

import {
  Messages,
  MessageText,
  Participants,
  PrivateChats,
  UserId,
} from "@/types";

export const privateChatModels = {
  chatId: commonModels.chatId,
  createdAt: commonModels.createdAt,
  messageId: commonModels.messageId,
  messages: nativeModelBuilder
    .create<Messages>()
    .type("array")
    .required(true)
    .empty(true)
    .build(),
  messageText: nativeModelBuilder
    .create<MessageText>()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(1)
    .maxLength(1000)
    .trim(true)
    .build(),
  participantId: nativeModelBuilder
    .create<UserId>()
    .type(commonModels.userId.type)
    .required(commonModels.userId.required)
    .empty(commonModels.userId.empty)
    .minLength(commonModels.userId.minLength)
    .maxLength(commonModels.userId.maxLength)
    .trim(commonModels.userId.trim)
    .unique(commonModels.userId.unique)
    .build(),
  participants: nativeModelBuilder
    .create<Participants>()
    .type("array")
    .required(true)
    .length(2)
    .empty(false)
    .build(),
  privateChats: nativeModelBuilder
    .create<PrivateChats>()
    .type("array")
    .required(true)
    .build(),
  senderId: nativeModelBuilder
    .create<UserId>()
    .type(commonModels.userId.type)
    .required(commonModels.userId.required)
    .empty(commonModels.userId.empty)
    .minLength(commonModels.userId.minLength)
    .maxLength(commonModels.userId.maxLength)
    .trim(commonModels.userId.trim)
    .unique(commonModels.userId.unique)
    .build(),
};
