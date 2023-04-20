import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { errors } from "@/variables/errors";

const clientId = nativeModelBuilder
  .create()
  .type("string", errors.CLIENT_ID_INVALID_TYPE)
  .required(true, errors.CLIENT_ID_REQUIRED)
  .minlength(40, errors.CLIENT_ID_MIN_LENGTH_REACH)
  .maxlength(50, errors.CLIENT_ID_MAX_LENGTH_REACH)
  .build();

const createdAt = nativeModelBuilder
  .create()
  .type("number", errors.CREATED_AT_INVALID_TYPE)
  .required(true, errors.CREATED_AT_REQUIRED)
  .empty(false, errors.CREATED_AT_EMPTY)
  .build();

const userId = nativeModelBuilder
  .create()
  .type("string", errors.USER_ID_INVALID_TYPE)
  .required(true, errors.USER_ID_REQUIRED)
  .empty(false, errors.USER_ID_EMPTY)
  .minlength(30, errors.USER_ID_MIN_LENGTH_REACH)
  .maxlength(35, errors.USER_ID_MAX_LENGTH_REACH)
  .trim(true)
  .unique(true, errors.USER_ID_EXIST)
  .build();

const chatId = nativeModelBuilder
  .create()
  .type("string", errors.CHAT_ID_INVALID_TYPE)
  .required(true, errors.CHAT_ID_REQUIRED)
  .empty(false, errors.CHAT_ID_EMPTY)
  .minlength(30, errors.CHAT_ID_MIN_LENGTH_REACH)
  .maxlength(35, errors.CHAT_ID_MAX_LENGTH_REACH)
  .trim(true)
  .unique(true, errors.CHAT_ID_EXIST)
  .build();

const messageId = nativeModelBuilder
  .create()
  .type("string", errors.MESSAGE_ID_INVALID_TYPE)
  .required(true, errors.MESSAGE_ID_REQUIRED)
  .empty(false, errors.MESSAGE_ID_EMPTY)
  .maxlength(45, errors.MESSAGE_ID_MAX_LENGTH_REACH)
  .minlength(40, errors.MESSAGE_ID_MIN_LENGTH_REACH)
  .trim(true)
  .unique(true, errors.MESSAGE_ID_EXIST)
  .build();

const commonModels = {
  chatId,
  clientId,
  createdAt,
  messageId,
  userId,
};

export { commonModels };
