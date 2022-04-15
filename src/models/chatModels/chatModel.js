const {
  modelPropertyGenerator,
  modelGenerator,
} = require("~/functions/utilities/generators");

const { commonModel } = require("~/models/commonModels/commonModel");

const {
  properties: {
    commonPrivateIdModel: { properties: commonPrivateIdModel },
  },
} = commonModel;

const {
  chatErrors: {
    properties: {
      MESSAGE_TEXT_INVALID_TYPE: { properties: MESSAGE_TEXT_INVALID_TYPE },
      MESSAGE_TEXT_MAX_LENGTH_REACH: {
        properties: MESSAGE_TEXT_MAX_LENGTH_REACH,
      },
      MESSAGE_TEXT_MIN_LENGTH_REACH: {
        properties: MESSAGE_TEXT_MIN_LENGTH_REACH,
      },
      PARTICIPANT_ID_EXIST: { properties: PARTICIPANT_ID_EXIST },
      PARTICIPANT_ID_INVALID_TYPE: { properties: PARTICIPANT_ID_INVALID_TYPE },
      PARTICIPANT_ID_MAX_LENGTH_REACH: {
        properties: PARTICIPANT_ID_MAX_LENGTH_REACH,
      },
      PARTICIPANT_ID_MIN_LENGTH_REACH: {
        properties: PARTICIPANT_ID_MIN_LENGTH_REACH,
      },
      PARTICIPANT_ID_REQUIRED: { properties: PARTICIPANT_ID_REQUIRED },
    },
  },
} = require("~/variables/errors/chatErrors");

const {
  properties: { commonCreatedAtModel, commonChatIdModel, commonMessageIdModel },
} = commonModel;

const chatIdModel = commonChatIdModel;
const createdAtModel = commonCreatedAtModel;
const messageIdModel = commonMessageIdModel;

const messageSenderModel = modelGenerator("1.0.0");

const messageStatusModel = modelGenerator("1.0.0");

const messageModel = modelGenerator(
  modelPropertyGenerator(10, MESSAGE_TEXT_MAX_LENGTH_REACH),
  modelPropertyGenerator(1, MESSAGE_TEXT_MIN_LENGTH_REACH),
  null,
  null,
  modelPropertyGenerator("string", MESSAGE_TEXT_INVALID_TYPE),
  null,
  null,
  "1.0.0"
);

const participantIdModel = modelGenerator(
  modelPropertyGenerator(
    commonPrivateIdModel.maxlength.value,
    PARTICIPANT_ID_MAX_LENGTH_REACH
  ),
  modelPropertyGenerator(
    commonPrivateIdModel.minlength.value,
    PARTICIPANT_ID_MIN_LENGTH_REACH
  ),
  modelPropertyGenerator(
    commonPrivateIdModel.required.value,
    PARTICIPANT_ID_REQUIRED
  ),
  modelPropertyGenerator(commonPrivateIdModel.trim.value),
  modelPropertyGenerator(
    commonPrivateIdModel.type.value,
    PARTICIPANT_ID_INVALID_TYPE
  ),
  modelPropertyGenerator(
    commonPrivateIdModel.unique.value,
    PARTICIPANT_ID_EXIST
  ),
  null,
  "1.0.0"
);

const participantStatusModel = modelGenerator("1.0.0");

const participantVisibilityModel = modelGenerator("1.0.0");

const chatModel = {
  info: { version: "1.0.0" },
  properties: {
    chatIdModel,
    createdAtModel,
    messageModel,
    messageIdModel,
    messageSenderModel,
    messageStatusModel,
    participantIdModel,
    participantStatusModel,
    participantVisibilityModel,
  },
};

module.exports = {
  chatModel,
};
