const { nativeModelBuilder } = require("@/classes/NativeModelBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { common } = require("@/models/native/common");

const { errors } = require("@/variables/errors/errors");

const chatId = common.chatId;
const createdAt = common.createdAt;
const messageId = common.messageId;

const message = nativeModelBuilder
  .create()
  .empty(false, errors.MESSAGE_TEXT_EMPTY)
  .maxlength(20, errors.MESSAGE_TEXT_MAX_LENGTH_REACH)
  .minlength(1, errors.MESSAGE_TEXT_MIN_LENGTH_REACH)
  .type("string", errors.MESSAGE_TEXT_INVALID_TYPE)
  .version("1.0.0")
  .build();

const participantId = nativeModelBuilder
  .create()
  .empty(common.userId.empty.value, errors.PARTICIPANT_EMPTY)
  .maxlength(
    common.userId.maxlength.value,
    errors.PARTICIPANT_ID_MAX_LENGTH_REACH
  )
  .minlength(
    common.userId.minlength.value,
    errors.PARTICIPANT_ID_MIN_LENGTH_REACH
  )
  .required(common.userId.required.value, errors.PARTICIPANT_ID_REQUIRED)
  .trim(common.userId.trim.value)
  .type(common.userId.type.value, errors.PARTICIPANT_ID_INVALID_TYPE)
  .unique(common.userId.unique.value, errors.PARTICIPANT_ID_EXIST)
  .version("1.0.0")
  .build();

const senderId = nativeModelBuilder
  .create()
  .maxlength(common.userId.maxlength.value, errors.SENDER_ID_MAX_LENGTH_REACH)
  .minlength(common.userId.minlength.value, errors.SENDER_ID_MIN_LENGTH_REACH)
  .required(common.userId.required.value, errors.SENDER_ID_REQUIRED)
  .trim(common.userId.trim.value)
  .type(common.userId.type.value, errors.SENDER_ID_INVALID_TYPE)
  .unique(common.userId.unique.value, errors.SENDER_ID_EXIST)
  .empty(common.userId.empty.value, errors.SENDER_EMPTY)
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
