const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { nativeModelBuilder } = require("@/classes/NativeModelBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors");

const createdAt = nativeModelBuilder
  .create()
  .defaultValue(Date.now)
  .required(true, errors.CREATED_AT_REQUIRED)
  .type("date", errors.CREATED_AT_INVALID_TYPE)
  .version("1.0.0")
  .build();

const userId = nativeModelBuilder
  .create()
  .empty(false, errors.PRIVATE_ID_EMPTY)
  .maxlength(35, errors.PRIVATE_ID_MAX_LENGTH_REACH)
  .minlength(30, errors.PRIVATE_ID_MIN_LENGTH_REACH)
  .required(true, errors.PRIVATE_ID_REQUIRED)
  .trim(true)
  .type("string", errors.PRIVATE_ID_INVALID_TYPE)
  .unique(true, errors.PRIVATE_ID_EXIST)
  .version("1.0.0")
  .build();

const chatId = nativeModelBuilder
  .create()
  .empty(false, errors.CHAT_ID_EMPTY)
  .maxlength(35, errors.CHAT_ID_MAX_LENGTH_REACH)
  .minlength(30, errors.CHAT_ID_MIN_LENGTH_REACH)
  .required(true, errors.CHAT_ID_REQUIRED)
  .trim(true)
  .type("string", errors.CHAT_ID_INVALID_TYPE)
  .unique(true, errors.CHAT_ID_EXIST)
  .version("1.0.0")
  .build();

const messageId = nativeModelBuilder
  .create()
  .defaultValue(randomMaker.randomId)
  .maxlength(45, errors.MESSAGE_ID_MAX_LENGTH_REACH)
  .minlength(40, errors.MESSAGE_ID_MIN_LENGTH_REACH)
  .required(true, errors.MESSAGE_ID_REQUIRED)
  .trim(true)
  .type("string", errors.MESSAGE_ID_INVALID_TYPE)
  .unique(true, errors.MESSAGE_ID_EXIST)
  .version("1.0.0")
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
