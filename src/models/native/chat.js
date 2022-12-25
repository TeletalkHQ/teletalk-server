const { nativeModelBuilder } = require("@/classes/NativeModelBuilder");

const { commonModels } = require("@/models/native/common");

const { errors } = require("@/variables/errors");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const chatId = commonModels.chatId;
const createdAt = commonModels.createdAt;
const messageId = commonModels.messageId;

const message = nativeModelBuilder
  .create()
  .empty(false, errors.MESSAGE_TEXT_EMPTY)
  .maxlength(1000, errors.MESSAGE_TEXT_MAX_LENGTH_REACH)
  .minlength(1, errors.MESSAGE_TEXT_MIN_LENGTH_REACH)
  .type(FIELD_TYPE.STRING, errors.MESSAGE_TEXT_INVALID_TYPE)
  .build();

const participantId = nativeModelBuilder
  .create()
  .empty(commonModels.userId.empty.value, errors.PARTICIPANT_EMPTY)
  .maxlength(
    commonModels.userId.maxlength.value,
    errors.PARTICIPANT_ID_MAX_LENGTH_REACH
  )
  .minlength(
    commonModels.userId.minlength.value,
    errors.PARTICIPANT_ID_MIN_LENGTH_REACH
  )
  .required(commonModels.userId.required.value, errors.PARTICIPANT_ID_REQUIRED)
  .trim(commonModels.userId.trim.value)
  .type(commonModels.userId.type.value, errors.PARTICIPANT_ID_INVALID_TYPE)
  .unique(commonModels.userId.unique.value, errors.PARTICIPANT_ID_EXIST)
  .build();

const privateChats = nativeModelBuilder.create().type(FIELD_TYPE.ARRAY).build();

const senderId = nativeModelBuilder
  .create()
  .maxlength(
    commonModels.userId.maxlength.value,
    errors.SENDER_ID_MAX_LENGTH_REACH
  )
  .minlength(
    commonModels.userId.minlength.value,
    errors.SENDER_ID_MIN_LENGTH_REACH
  )
  .required(commonModels.userId.required.value, errors.SENDER_ID_REQUIRED)
  .trim(commonModels.userId.trim.value)
  .type(commonModels.userId.type.value, errors.SENDER_ID_INVALID_TYPE)
  .unique(commonModels.userId.unique.value, errors.SENDER_ID_EXIST)
  .empty(commonModels.userId.empty.value, errors.SENDER_EMPTY)
  .build();

const chatModels = {
  chatId,
  createdAt,
  message,
  messageId,
  participantId,
  privateChats,
  senderId,
};

module.exports = {
  chatModels,
};
