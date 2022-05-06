const {
  modelPropertyGenerator,
  modelGenerator,
} = require("@/functions/utilities/generators");
const { randomId } = require("@/functions/utilities/randomId");
const {
  versionCalculator,
  extractFromInfo,
  extractVersions,
} = require("@/functions/utilities/utilsNoDeps");

const {
  chatErrors: {
    properties: {
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
  },
} = require("@/variables/errors/chatErrors");

const {
  userErrors: {
    properties: {
      CREATED_AT_INVALID_TYPE: { properties: CREATED_AT_INVALID_TYPE },
      PRIVATE_ID_EXIST: { properties: PRIVATE_ID_EXIST },
      PRIVATE_ID_INVALID_TYPE: { properties: PRIVATE_ID_INVALID_TYPE },
      PRIVATE_ID_MAX_LENGTH_REACH: { properties: PRIVATE_ID_MAX_LENGTH_REACH },
      PRIVATE_ID_MIN_LENGTH_REACH: { properties: PRIVATE_ID_MIN_LENGTH_REACH },
      PRIVATE_ID_REQUIRED: { properties: PRIVATE_ID_REQUIRED },
    },
  },
} = require("@/variables/errors/userErrors");

const createdAtCommonModel = modelGenerator(
  null,
  null,
  modelPropertyGenerator(true),
  null,
  modelPropertyGenerator("date", CREATED_AT_INVALID_TYPE),
  null,
  modelPropertyGenerator(Date.now),
  "1.0.0"
);

const privateIdCommonModel = modelGenerator(
  modelPropertyGenerator(35, PRIVATE_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(30, PRIVATE_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, PRIVATE_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", PRIVATE_ID_INVALID_TYPE),
  modelPropertyGenerator(true, PRIVATE_ID_EXIST),
  null,
  "1.0.0"
);

const chatIdCommonModel = modelGenerator(
  modelPropertyGenerator(35, CHAT_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(30, CHAT_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, CHAT_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", CHAT_ID_INVALID_TYPE),
  modelPropertyGenerator(true, CHAT_ID_EXIST),
  null,
  "1.0.0"
);
const messageIdCommonModel = modelGenerator(
  modelPropertyGenerator(45, MESSAGE_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(40, MESSAGE_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, MESSAGE_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", MESSAGE_ID_INVALID_TYPE),
  modelPropertyGenerator(true, MESSAGE_ID_EXIST),
  modelPropertyGenerator(randomId),
  "1.0.0"
);

const models = {
  createdAtCommonModel,
  privateIdCommonModel,
  chatIdCommonModel,
  messageIdCommonModel,
};

const commonModels = {
  info: {
    version: versionCalculator(extractVersions(extractFromInfo(models))),
  },

  properties: models,
};

module.exports = {
  commonModels,
};
