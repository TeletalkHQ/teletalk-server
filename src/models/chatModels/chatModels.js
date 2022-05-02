const {
  modelPropertyGenerator,
  modelGenerator,
} = require("@/functions/utilities/generators");

const {
  commonModels: {
    properties: {
      createdAtCommonModel,
      chatIdCommonModel,
      messageIdCommonModel,
      privateIdCommonModel: { properties: privateIdCommonModel },
    },
  },
} = require("@/models/commonModels/commonModels");

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
} = require("@/variables/errors/chatErrors");

const chatIdModel = chatIdCommonModel;
const createdAtModel = createdAtCommonModel;
const messageIdModel = messageIdCommonModel;

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
    privateIdCommonModel.maxlength.value,
    PARTICIPANT_ID_MAX_LENGTH_REACH
  ),
  modelPropertyGenerator(
    privateIdCommonModel.minlength.value,
    PARTICIPANT_ID_MIN_LENGTH_REACH
  ),
  modelPropertyGenerator(
    privateIdCommonModel.required.value,
    PARTICIPANT_ID_REQUIRED
  ),
  modelPropertyGenerator(privateIdCommonModel.trim.value),
  modelPropertyGenerator(
    privateIdCommonModel.type.value,
    PARTICIPANT_ID_INVALID_TYPE
  ),
  modelPropertyGenerator(
    privateIdCommonModel.unique.value,
    PARTICIPANT_ID_EXIST
  ),
  null,
  "1.0.0"
);

const participantStatusModel = modelGenerator("1.0.0");

const participantVisibilityModel = modelGenerator("1.0.0");

const chatModels = {
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
  chatModels,
};
