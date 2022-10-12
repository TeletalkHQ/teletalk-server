const { modelBuilder } = require("@/classes/ModelBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { common } = require("@/models/native/common");

const {
  chatErrors: {
    MESSAGE_TEXT_EMPTY,
    MESSAGE_TEXT_INVALID_TYPE,
    MESSAGE_TEXT_MAX_LENGTH_REACH,
    MESSAGE_TEXT_MIN_LENGTH_REACH,
    PARTICIPANT_EMPTY,
    PARTICIPANT_ID_EXIST,
    PARTICIPANT_ID_INVALID_TYPE,
    PARTICIPANT_ID_MAX_LENGTH_REACH,
    PARTICIPANT_ID_MIN_LENGTH_REACH,
    PARTICIPANT_ID_REQUIRED,
    SENDER_EMPTY,
    SENDER_ID_EXIST,
    SENDER_ID_INVALID_TYPE,
    SENDER_ID_MAX_LENGTH_REACH,
    SENDER_ID_MIN_LENGTH_REACH,
    SENDER_ID_REQUIRED,
  },
} = require("@/variables/errors/chatErrors");

const chatId = common.chatId;
const createdAt = common.createdAt;
const messageId = common.messageId;

const message = modelBuilder
  .create()
  .empty(false, MESSAGE_TEXT_EMPTY)
  .maxlength(20, MESSAGE_TEXT_MAX_LENGTH_REACH)
  .minlength(1, MESSAGE_TEXT_MIN_LENGTH_REACH)
  .type("string", MESSAGE_TEXT_INVALID_TYPE)
  .version("1.0.0")
  .build();

const participantId = modelBuilder
  .create()
  .empty(common.privateId.empty.value, PARTICIPANT_EMPTY)
  .maxlength(common.privateId.maxlength.value, PARTICIPANT_ID_MAX_LENGTH_REACH)
  .minlength(common.privateId.minlength.value, PARTICIPANT_ID_MIN_LENGTH_REACH)
  .required(common.privateId.required.value, PARTICIPANT_ID_REQUIRED)
  .trim(common.privateId.trim.value)
  .type(common.privateId.type.value, PARTICIPANT_ID_INVALID_TYPE)
  .unique(common.privateId.unique.value, PARTICIPANT_ID_EXIST)
  .version("1.0.0")
  .build();

const senderId = modelBuilder
  .create()
  .maxlength(common.privateId.maxlength.value, SENDER_ID_MAX_LENGTH_REACH)
  .minlength(common.privateId.minlength.value, SENDER_ID_MIN_LENGTH_REACH)
  .required(common.privateId.required.value, SENDER_ID_REQUIRED)
  .trim(common.privateId.trim.value)
  .type(common.privateId.type.value, SENDER_ID_INVALID_TYPE)
  .unique(common.privateId.unique.value, SENDER_ID_EXIST)
  .empty(common.privateId.empty.value, SENDER_EMPTY)
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
