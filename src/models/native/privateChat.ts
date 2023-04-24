import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { commonModels } from "@/models/native/common";
import { NativeModelPicker } from "@/types";

import { ERRORS } from "@/variables";

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
    .type("array", ERRORS.MESSAGES_INVALID_TYPE)
    .required(true, ERRORS.MESSAGES_REQUIRED)
    .empty(true)
    .build(),
  messageText: nativeModelBuilder
    .create()
    .type("string", ERRORS.MESSAGE_TEXT_INVALID_TYPE)
    .required(true, ERRORS.MESSAGE_TEXT_REQUIRED)
    .empty(false, ERRORS.MESSAGE_TEXT_EMPTY)
    .minLength(1, ERRORS.MESSAGE_TEXT_MIN_LENGTH_REACH)
    .maxLength(1000, ERRORS.MESSAGE_TEXT_MAX_LENGTH_REACH)
    .trim(true)
    .build(),
  participantId: nativeModelBuilder
    .create()
    .type(commonModels.userId.type.value, ERRORS.PARTICIPANT_ID_INVALID_TYPE)
    .required(
      commonModels.userId.required.value,
      ERRORS.PARTICIPANT_ID_REQUIRED
    )
    .empty(commonModels.userId.empty.value, ERRORS.PARTICIPANT_ID_EMPTY)
    .minLength(
      commonModels.userId.minLength.value,
      ERRORS.PARTICIPANT_ID_MIN_LENGTH_REACH
    )
    .maxLength(
      commonModels.userId.maxLength.value,
      ERRORS.PARTICIPANT_ID_MAX_LENGTH_REACH
    )
    .trim(commonModels.userId.trim.value)
    .unique(commonModels.userId.unique.value, ERRORS.PARTICIPANT_ID_EXIST)
    .build(),
  participants: nativeModelBuilder
    .create()
    .type("array", ERRORS.PARTICIPANTS_INVALID_TYPE)
    .required(true, ERRORS.PARTICIPANTS_REQUIRED)
    .length(2, ERRORS.PARTICIPANTS_INVALID_LENGTH)
    .empty(false, ERRORS.PARTICIPANTS_EMPTY)
    .build(),
  privateChats: nativeModelBuilder
    .create()
    .type("array", ERRORS.PRIVATE_CHATS_INVALID_TYPE)
    .required(true, ERRORS.PRIVATE_CHATS_REQUIRED)
    .build(),
  senderId: nativeModelBuilder
    .create()
    .type(commonModels.userId.type.value, ERRORS.SENDER_ID_INVALID_TYPE)
    .required(commonModels.userId.required.value, ERRORS.SENDER_ID_REQUIRED)
    .empty(commonModels.userId.empty.value, ERRORS.SENDER_EMPTY)
    .minLength(
      commonModels.userId.minLength.value,
      ERRORS.SENDER_ID_MIN_LENGTH_REACH
    )
    .maxLength(
      commonModels.userId.maxLength.value,
      ERRORS.SENDER_ID_MAX_LENGTH_REACH
    )
    .trim(commonModels.userId.trim.value)
    .unique(commonModels.userId.unique.value, ERRORS.SENDER_ID_EXIST)
    .build(),
};
