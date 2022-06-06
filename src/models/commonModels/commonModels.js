const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");
const { randomMaker } = require("@/functions/helpers/RandomMaker");

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
    CREATED_AT_REQUIRED,
    PRIVATE_ID_EMPTY,
    PRIVATE_ID_EXIST,
    PRIVATE_ID_INVALID_TYPE,
    PRIVATE_ID_MAX_LENGTH_REACH,
    PRIVATE_ID_MIN_LENGTH_REACH,
    PRIVATE_ID_REQUIRED,
  },
} = require("@/variables/errors/userErrors");
const { modelBuilder } = require("@/functions/helpers/Builders");

const createdAtCommonModel = modelBuilder
  .create()
  .defaultValue(Date.now)
  .required(true, CREATED_AT_REQUIRED)
  .type("date", CREATED_AT_INVALID_TYPE)
  .version("1.0.0")
  .build();

const privateIdCommonModel = modelBuilder
  .create()
  .empty(false, PRIVATE_ID_EMPTY)
  .maxlength(35, PRIVATE_ID_MAX_LENGTH_REACH)
  .minlength(30, PRIVATE_ID_MIN_LENGTH_REACH)
  .required(true, PRIVATE_ID_REQUIRED)
  .trim(true)
  .type("string", PRIVATE_ID_INVALID_TYPE)
  .unique(true, PRIVATE_ID_EXIST)
  .version("1.0.0")
  .build();

const chatIdCommonModel = modelBuilder
  .create()
  .maxlength(35, CHAT_ID_MAX_LENGTH_REACH)
  .minlength(30, CHAT_ID_MIN_LENGTH_REACH)
  .required(true, CHAT_ID_REQUIRED)
  .trim(true)
  .type("string", CHAT_ID_INVALID_TYPE)
  .unique(true, CHAT_ID_EXIST)
  .version("1.0.0")
  .build();

const messageIdCommonModel = modelBuilder
  .create()
  .defaultValue(randomMaker.randomId)
  .maxlength(45, MESSAGE_ID_MAX_LENGTH_REACH)
  .minlength(40, MESSAGE_ID_MIN_LENGTH_REACH)
  .required(true, MESSAGE_ID_REQUIRED)
  .trim(true)
  .type("string", MESSAGE_ID_INVALID_TYPE)
  .unique(true, MESSAGE_ID_EXIST)
  .version("1.0.0")
  .build();

const models = {
  chatIdCommonModel,
  createdAtCommonModel,
  messageIdCommonModel,
  privateIdCommonModel,
};

const commonModels = {
  version: versionCalculator(extractVersions(models)),
  ...models,
};

module.exports = {
  commonModels,
};
