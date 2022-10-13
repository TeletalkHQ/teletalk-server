const { modelBuilder } = require("@/classes/ModelBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { common } = require("@/models/native/common");

const { errors } = require("@/variables/errors/errors");

const chatId = common.chatId;
const createdAt = common.createdAt;
const messageId = common.messageId;

const message = modelBuilder
  .create()
  .empty(false, errors.MESSAGE_TEXT_EMPTY)
  .maxlength(20, errors.MESSAGE_TEXT_MAX_LENGTH_REACH)
  .minlength(1, errors.MESSAGE_TEXT_MIN_LENGTH_REACH)
  .type("string", errors.MESSAGE_TEXT_INVALID_TYPE)
  .version("1.0.0")
  .build();

const participantId = modelBuilder
  .create()
  .empty(common.privateId.empty.value, errors.PARTICIPANT_EMPTY)
  .maxlength(
    common.privateId.maxlength.value,
    errors.PARTICIPANT_ID_MAX_LENGTH_REACH
  )
  .minlength(
    common.privateId.minlength.value,
    errors.PARTICIPANT_ID_MIN_LENGTH_REACH
  )
  .required(common.privateId.required.value, errors.PARTICIPANT_ID_REQUIRED)
  .trim(common.privateId.trim.value)
  .type(common.privateId.type.value, errors.PARTICIPANT_ID_INVALID_TYPE)
  .unique(common.privateId.unique.value, errors.PARTICIPANT_ID_EXIST)
  .version("1.0.0")
  .build();

const senderId = modelBuilder
  .create()
  .maxlength(
    common.privateId.maxlength.value,
    errors.SENDER_ID_MAX_LENGTH_REACH
  )
  .minlength(
    common.privateId.minlength.value,
    errors.SENDER_ID_MIN_LENGTH_REACH
  )
  .required(common.privateId.required.value, errors.SENDER_ID_REQUIRED)
  .trim(common.privateId.trim.value)
  .type(common.privateId.type.value, errors.SENDER_ID_INVALID_TYPE)
  .unique(common.privateId.unique.value, errors.SENDER_ID_EXIST)
  .empty(common.privateId.empty.value, errors.SENDER_EMPTY)
  .version("1.0.0")
  .build();

const models = {
  chatId,
  createdAt,
  messageId,
  message,
  participantId,
  senderId,
};

const chat = {
  version: versionCalculator(extractVersions(models)),
  ...models,
};

module.exports = {
  chat,
};
