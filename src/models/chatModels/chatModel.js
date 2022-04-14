const {
  modelPropertyGenerator,
  modelGenerator,
} = require("~/functions/utilities/generators");

const { commonModel } = require("~/models/commonModels/commonModel");

const {
  properties: {
    privateIDModel: { properties: privateID },
  },
} = commonModel;

const {
  chatErrorTemplate: {
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
} = require("~/variables/errors/chatErrorTemplate");

const {
  properties: {
    commonCreatedAtModel: { properties: commonCreatedAtModel },
    commonChatIDModel: { properties: commonChatIDModel },
    commonMessageIdModel: { properties: commonMessageIdModel },
  },
} = commonModel;

const chatIdModel = commonChatIDModel;
const createdAtModel = commonCreatedAtModel;
const messageIdModel = commonMessageIdModel;

const messageSender = modelGenerator("1.0.0");

const messageStatus = modelGenerator("1.0.0");

const message = modelGenerator(
  modelPropertyGenerator(10, MESSAGE_TEXT_MAX_LENGTH_REACH),
  modelPropertyGenerator(1, MESSAGE_TEXT_MIN_LENGTH_REACH),
  null,
  null,
  modelPropertyGenerator("string", MESSAGE_TEXT_INVALID_TYPE),
  null,
  null,
  "1.0.0"
);

const participantID = modelGenerator(
  modelPropertyGenerator(
    privateID.maxlength.value,
    PARTICIPANT_ID_MAX_LENGTH_REACH
  ),
  modelPropertyGenerator(
    privateID.minlength.value,
    PARTICIPANT_ID_MIN_LENGTH_REACH
  ),
  modelPropertyGenerator(privateID.required.value, PARTICIPANT_ID_REQUIRED),
  modelPropertyGenerator(privateID.trim.value),
  modelPropertyGenerator(privateID.type.value, PARTICIPANT_ID_INVALID_TYPE),
  modelPropertyGenerator(privateID.unique.value, PARTICIPANT_ID_EXIST),
  null,
  "1.0.0"
);

const participantStatus = modelGenerator("1.0.0");

const participantVisibility = modelGenerator("1.0.0");

const chatModel = {
  version: "1.0.0",

  chatIdModel,
  createdAtModel,
  message,
  messageIdModel,
  messageSender,
  messageStatus,
  participantID,
  participantStatus,
  participantVisibility,
};

module.exports = {
  chatModel,
};
