const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { nativeModelBuilder } = require("@/classes/NativeModelBuilder");

const { extractVersions, versionCalculator } = require("@/utilities/utilities");

const { errors } = require("@/variables/errors");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const createdAt = nativeModelBuilder
  .create()
  .defaultValue(Date.now)
  .required(true, errors.CREATED_AT_REQUIRED)
  .type(FIELD_TYPE.DATE, errors.CREATED_AT_INVALID_TYPE)
  .build();

const userId = nativeModelBuilder
  .create()
  .empty(false, errors.USER_ID_EMPTY)
  .maxlength(35, errors.USER_ID_MAX_LENGTH_REACH)
  .minlength(30, errors.USER_ID_MIN_LENGTH_REACH)
  .required(true, errors.USER_ID_REQUIRED)
  .trim(true)
  .type(FIELD_TYPE.STRING, errors.USER_ID_INVALID_TYPE)
  .unique(true, errors.USER_ID_EXIST)
  .build();

const chatId = nativeModelBuilder
  .create()
  .empty(false, errors.CHAT_ID_EMPTY)
  .maxlength(35, errors.CHAT_ID_MAX_LENGTH_REACH)
  .minlength(30, errors.CHAT_ID_MIN_LENGTH_REACH)
  .required(true, errors.CHAT_ID_REQUIRED)
  .trim(true)
  .type(FIELD_TYPE.STRING, errors.CHAT_ID_INVALID_TYPE)
  .unique(true, errors.CHAT_ID_EXIST)
  .build();

const messageId = nativeModelBuilder
  .create()
  .defaultValue(randomMaker.randomId)
  .maxlength(45, errors.MESSAGE_ID_MAX_LENGTH_REACH)
  .minlength(40, errors.MESSAGE_ID_MIN_LENGTH_REACH)
  .required(true, errors.MESSAGE_ID_REQUIRED)
  .trim(true)
  .type(FIELD_TYPE.STRING, errors.MESSAGE_ID_INVALID_TYPE)
  .unique(true, errors.MESSAGE_ID_EXIST)
  .build();

const models = {
  chatId,
  createdAt,
  messageId,
  userId,
};

const common = {
  version: versionCalculator(extractVersions(models)),
  ...models,
};

module.exports = {
  common,
};
