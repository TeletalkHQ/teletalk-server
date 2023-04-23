import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { ERRORS } from "@/variables";

const clientId = nativeModelBuilder
  .create()
  .type("string", ERRORS.CLIENT_ID_INVALID_TYPE)
  .required(true, ERRORS.CLIENT_ID_REQUIRED)
  .minLength(40, ERRORS.CLIENT_ID_MIN_LENGTH_REACH)
  .maxLength(50, ERRORS.CLIENT_ID_MAX_LENGTH_REACH)
  .build();

const createdAt = nativeModelBuilder
  .create()
  .type("number", ERRORS.CREATED_AT_INVALID_TYPE)
  .required(true, ERRORS.CREATED_AT_REQUIRED)
  .empty(false, ERRORS.CREATED_AT_EMPTY)
  .build();

const userId = nativeModelBuilder
  .create()
  .type("string", ERRORS.USER_ID_INVALID_TYPE)
  .required(true, ERRORS.USER_ID_REQUIRED)
  .empty(false, ERRORS.USER_ID_EMPTY)
  .minLength(30, ERRORS.USER_ID_MIN_LENGTH_REACH)
  .maxLength(35, ERRORS.USER_ID_MAX_LENGTH_REACH)
  .trim(true)
  .unique(true, ERRORS.USER_ID_EXIST)
  .build();

const chatId = nativeModelBuilder
  .create()
  .type("string", ERRORS.CHAT_ID_INVALID_TYPE)
  .required(true, ERRORS.CHAT_ID_REQUIRED)
  .empty(false, ERRORS.CHAT_ID_EMPTY)
  .minLength(30, ERRORS.CHAT_ID_MIN_LENGTH_REACH)
  .maxLength(35, ERRORS.CHAT_ID_MAX_LENGTH_REACH)
  .trim(true)
  .unique(true, ERRORS.CHAT_ID_EXIST)
  .build();

const messageId = nativeModelBuilder
  .create()
  .type("string", ERRORS.MESSAGE_ID_INVALID_TYPE)
  .required(true, ERRORS.MESSAGE_ID_REQUIRED)
  .empty(false, ERRORS.MESSAGE_ID_EMPTY)
  .maxLength(45, ERRORS.MESSAGE_ID_MAX_LENGTH_REACH)
  .minLength(40, ERRORS.MESSAGE_ID_MIN_LENGTH_REACH)
  .trim(true)
  .unique(true, ERRORS.MESSAGE_ID_EXIST)
  .build();

const commonModels = {
  chatId,
  clientId,
  createdAt,
  messageId,
  userId,
};

export { commonModels };
