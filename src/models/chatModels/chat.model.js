const { randomID } = require("~/functions/utilities/randomID");
const {
  modelPropertyGenerator,
  modelGenerator,
} = require("~/functions/utilities/generators");

const {
  userModel: {
    privateIDModel: { properties: privateID },
  },
} = require("~/models/userModels/user.model");
const { commonModel } = require("~/models/commonModels/common.model");

const {
  chatErrorTemplate: {
    CHAT_ID_EXIST: { properties: CHAT_ID_EXIST },
    CHAT_ID_INVALID_TYPE: { properties: CHAT_ID_INVALID_TYPE },
    CHAT_ID_MAX_LENGTH_REACH: { properties: CHAT_ID_MAX_LENGTH_REACH },
    CHAT_ID_MIN_LENGTH_REACH: { properties: CHAT_ID_MIN_LENGTH_REACH },
    CHAT_ID_REQUIRED: { properties: CHAT_ID_REQUIRED },
    MESSAGE_ID_EXIST: { properties: MESSAGE_ID_EXIST },
    MESSAGE_ID_INVALID_TYPE: { properties: MESSAGE_ID_INVALID_TYPE },
    MESSAGE_ID_MAX_LENGTH_REACH: { properties: MESSAGE_ID_MAX_LENGTH_REACH },
    MESSAGE_ID_MIN_LENGTH_REACH: { properties: MESSAGE_ID_MIN_LENGTH_REACH },
    MESSAGE_ID_REQUIRED: { properties: MESSAGE_ID_REQUIRED },
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

const chatID = modelGenerator(
  modelPropertyGenerator(35, CHAT_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(30, CHAT_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, CHAT_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", CHAT_ID_INVALID_TYPE),
  modelPropertyGenerator(true, CHAT_ID_EXIST),
  "1.0.0"
);

const createdAt = commonModel.createdAt;

const messageID = modelGenerator(
  modelPropertyGenerator(45, MESSAGE_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(40, MESSAGE_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, MESSAGE_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", MESSAGE_ID_INVALID_TYPE),
  modelPropertyGenerator(true, MESSAGE_ID_EXIST),
  modelPropertyGenerator(randomID),
  "1.0.0"
);

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

  chatID,
  createdAt,
  message,
  messageID,
  messageSender,
  messageStatus,
  participantID,
  participantStatus,
  participantVisibility,
};

module.exports = {
  chatModel,
};
