const { modelPropertyGenerator } = require("@/functions/utilities/generators");
const { randomId } = require("@/functions/utilities/randomId");
const {
  versionCalculator,

  extractVersions,
} = require("@/functions/utilities/utils");

const {
  chatErrors: {
    CHAT_ID_EXIST,
    CHAT_ID_INVALID_TYPE,
    CHAT_ID_MAX_LENGTH_REACH,
    CHAT_ID_MIN_LENGTH_REACH,
    CHAT_ID_REQUIRED,
    MESSAGE_ID_EXIST,
    MESSAGE_ID_INVALID_TYPE,
    MESSAGE_ID_MAX_LENGTH_REACH,
    MESSAGE_ID_MIN_LENGTH_REACH,
    MESSAGE_ID_REQUIRED,
  },
} = require("@/variables/errors/chatErrors");

const {
  userErrors: {
    CREATED_AT_INVALID_TYPE,
    PRIVATE_ID_EXIST,
    PRIVATE_ID_INVALID_TYPE,
    PRIVATE_ID_MAX_LENGTH_REACH,
    PRIVATE_ID_MIN_LENGTH_REACH,
    PRIVATE_ID_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const createdAtCommonModel = {
  required: modelPropertyGenerator(true),
  type: modelPropertyGenerator("date", CREATED_AT_INVALID_TYPE),
  defaultValue: modelPropertyGenerator(Date.now),
  version: "1.0.0",
};

const privateIdCommonModel = {
  maxlength: modelPropertyGenerator(35, PRIVATE_ID_MAX_LENGTH_REACH),
  minlength: modelPropertyGenerator(30, PRIVATE_ID_MIN_LENGTH_REACH),
  required: modelPropertyGenerator(true, PRIVATE_ID_REQUIRED),
  trim: modelPropertyGenerator(true),
  type: modelPropertyGenerator("string", PRIVATE_ID_INVALID_TYPE),
  unique: modelPropertyGenerator(true, PRIVATE_ID_EXIST),
  version: "1.0.0",
};

const chatIdCommonModel = {
  maxlength: modelPropertyGenerator(35, CHAT_ID_MAX_LENGTH_REACH),
  minlength: modelPropertyGenerator(30, CHAT_ID_MIN_LENGTH_REACH),
  required: modelPropertyGenerator(true, CHAT_ID_REQUIRED),
  trim: modelPropertyGenerator(true),
  type: modelPropertyGenerator("string", CHAT_ID_INVALID_TYPE),
  unique: modelPropertyGenerator(true, CHAT_ID_EXIST),
  version: "1.0.0",
};
const messageIdCommonModel = {
  maxlength: modelPropertyGenerator(45, MESSAGE_ID_MAX_LENGTH_REACH),
  minlength: modelPropertyGenerator(40, MESSAGE_ID_MIN_LENGTH_REACH),
  required: modelPropertyGenerator(true, MESSAGE_ID_REQUIRED),
  trim: modelPropertyGenerator(true),
  type: modelPropertyGenerator("string", MESSAGE_ID_INVALID_TYPE),
  unique: modelPropertyGenerator(true, MESSAGE_ID_EXIST),
  defaultValue: modelPropertyGenerator(randomId),
  version: "1.0.0",
};

const models = {
  createdAtCommonModel,
  privateIdCommonModel,
  chatIdCommonModel,
  messageIdCommonModel,
};

const commonModels = {
  version: versionCalculator(extractVersions(models)),
  ...models,
};

module.exports = {
  commonModels,
};
