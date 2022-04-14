const {
  modelPropertyGenerator,
  modelGenerator,
} = require("~/functions/utilities/generators");
const { randomID } = require("~/functions/utilities/randomID");

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
  },
} = require("~/variables/errors/chatErrorTemplate");

const {
  userErrorTemplate: {
    CREATED_AT_INVALID_TYPE: { properties: CREATED_AT_INVALID_TYPE },
    PRIVATE_ID_EXIST: { properties: PRIVATE_ID_EXIST },
    PRIVATE_ID_INVALID_TYPE: { properties: PRIVATE_ID_INVALID_TYPE },
    PRIVATE_ID_MAX_LENGTH_REACH: { properties: PRIVATE_ID_MAX_LENGTH_REACH },
    PRIVATE_ID_MIN_LENGTH_REACH: { properties: PRIVATE_ID_MIN_LENGTH_REACH },
    PRIVATE_ID_REQUIRED: { properties: PRIVATE_ID_REQUIRED },
  },
} = require("~/variables/errors/userErrorTemplate");

const commonCreatedAtModel = modelGenerator(
  null,
  null,
  modelPropertyGenerator(true),
  null,
  modelPropertyGenerator("date", CREATED_AT_INVALID_TYPE),
  null,
  modelPropertyGenerator(Date.now),
  "1.0.0"
);

const commonPrivateIdModel = modelGenerator(
  modelPropertyGenerator(35, PRIVATE_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(30, PRIVATE_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, PRIVATE_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", PRIVATE_ID_INVALID_TYPE),
  modelPropertyGenerator(true, PRIVATE_ID_EXIST),
  null,
  "1.0.0"
);

const commonChatIdModel = modelGenerator(
  modelPropertyGenerator(35, CHAT_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(30, CHAT_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, CHAT_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", CHAT_ID_INVALID_TYPE),
  modelPropertyGenerator(true, CHAT_ID_EXIST),
  "1.0.0"
);
const commonMessageIdModel = modelGenerator(
  modelPropertyGenerator(45, MESSAGE_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(40, MESSAGE_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, MESSAGE_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", MESSAGE_ID_INVALID_TYPE),
  modelPropertyGenerator(true, MESSAGE_ID_EXIST),
  modelPropertyGenerator(randomID),
  "1.0.0"
);

const commonModel = {
  info: { version: "1.0.0" },

  properties: {
    commonCreatedAtModel,
    commonPrivateIdModel,
    commonChatIdModel,
    commonMessageIdModel,
  },
};

module.exports = {
  commonModel,
};
