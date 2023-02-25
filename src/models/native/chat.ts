const { nativeModelBuilder } = require("@/classes/NativeModelBuilder");

const { commonModels } = require("@/models/native/common");

const { errors } = require("@/variables/errors");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const chatId = commonModels.chatId;
const createdAt = commonModels.createdAt;
const messageId = commonModels.messageId;

const message = nativeModelBuilder
  .create()
  .type(FIELD_TYPE.STRING, errors.MESSAGE_TEXT_INVALID_TYPE)
  .required(true, errors.MESSAGE_TEXT_REQUIRED)
  .empty(false, errors.MESSAGE_TEXT_EMPTY)
  .minlength(1, errors.MESSAGE_TEXT_MIN_LENGTH_REACH)
  .maxlength(1000, errors.MESSAGE_TEXT_MAX_LENGTH_REACH)
  .trim(true)
  .build();

const messages = nativeModelBuilder
  .create()
  .type(FIELD_TYPE.ARRAY, errors.MESSAGES_INVALID_TYPE)
  .required(true, errors.MESSAGES_REQUIRED)
  .empty(true)
  .build();

const participants = nativeModelBuilder
  .create()
  .type(FIELD_TYPE.ARRAY, errors.PARTICIPANTS_INVALID_TYPE)
  .required(true, errors.PARTICIPANTS_REQUIRED)
  .length(2, errors.PARTICIPANTS_INVALID_LENGTH)
  .empty(false, errors.PARTICIPANTS_EMPTY)
  .build();

const participantId = nativeModelBuilder
  .create()
  .type(commonModels.userId.type.value, errors.PARTICIPANT_ID_INVALID_TYPE)
  .required(commonModels.userId.required.value, errors.PARTICIPANT_ID_REQUIRED)
  .empty(commonModels.userId.empty.value, errors.PARTICIPANT_ID_EMPTY)
  .minlength(
    commonModels.userId.minlength.value,
    errors.PARTICIPANT_ID_MIN_LENGTH_REACH
  )
  .maxlength(
    commonModels.userId.maxlength.value,
    errors.PARTICIPANT_ID_MAX_LENGTH_REACH
  )
  .trim(commonModels.userId.trim.value)
  .unique(commonModels.userId.unique.value, errors.PARTICIPANT_ID_EXIST)
  .build();

const privateChats = nativeModelBuilder
  .create()
  .type(FIELD_TYPE.ARRAY, errors.PRIVATE_CHATS_INVALID_TYPE)
  .build();

const senderId = nativeModelBuilder
  .create()
  .type(commonModels.userId.type.value, errors.SENDER_ID_INVALID_TYPE)
  .required(commonModels.userId.required.value, errors.SENDER_ID_REQUIRED)
  .empty(commonModels.userId.empty.value, errors.SENDER_EMPTY)
  .minlength(
    commonModels.userId.minlength.value,
    errors.SENDER_ID_MIN_LENGTH_REACH
  )
  .maxlength(
    commonModels.userId.maxlength.value,
    errors.SENDER_ID_MAX_LENGTH_REACH
  )
  .trim(commonModels.userId.trim.value)
  .unique(commonModels.userId.unique.value, errors.SENDER_ID_EXIST)
  .build();

const chatModels = {
  chatId,
  createdAt,
  message,
  messageId,
  messages,
  participantId,
  privateChats,
  senderId,
  participants,
};

module.exports = {
  chatModels,
};
