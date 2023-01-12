const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { nativeModelBuilder } = require("@/classes/NativeModelBuilder");

const { errors } = require("@/variables/errors");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const createdAt = nativeModelBuilder
  .create()
  .type(FIELD_TYPE.DATE, errors.CREATED_AT_INVALID_TYPE)
  .required(true, errors.CREATED_AT_REQUIRED)
  .empty(false, errors.CREATED_AT_EMPTY)
  .defaultValue(Date.now)
  .build();

const userId = nativeModelBuilder
  .create()
  .type(FIELD_TYPE.STRING, errors.USER_ID_INVALID_TYPE)
  .required(true, errors.USER_ID_REQUIRED)
  .empty(false, errors.USER_ID_EMPTY)
  .minlength(30, errors.USER_ID_MIN_LENGTH_REACH)
  .maxlength(35, errors.USER_ID_MAX_LENGTH_REACH)
  .trim(true)
  .unique(true, errors.USER_ID_EXIST)
  .build();

const chatId = nativeModelBuilder
  .create()
  .type(FIELD_TYPE.STRING, errors.CHAT_ID_INVALID_TYPE)
  .required(true, errors.CHAT_ID_REQUIRED)
  .empty(false, errors.CHAT_ID_EMPTY)
  .minlength(30, errors.CHAT_ID_MIN_LENGTH_REACH)
  .maxlength(35, errors.CHAT_ID_MAX_LENGTH_REACH)
  .trim(true)
  .unique(true, errors.CHAT_ID_EXIST)
  .build();

const messageId = nativeModelBuilder
  .create()
  .type(FIELD_TYPE.STRING, errors.MESSAGE_ID_INVALID_TYPE)
  .required(true, errors.MESSAGE_ID_REQUIRED)
  .empty(false, errors.MESSAGE_ID_EMPTY)
  .defaultValue(randomMaker.id)
  .maxlength(45, errors.MESSAGE_ID_MAX_LENGTH_REACH)
  .minlength(40, errors.MESSAGE_ID_MIN_LENGTH_REACH)
  .trim(true)
  .unique(true, errors.MESSAGE_ID_EXIST)
  .build();

const commonModels = {
  chatId,
  createdAt,
  messageId,
  userId,
};

module.exports = {
  commonModels,
};
