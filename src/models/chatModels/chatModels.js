const { modelBuilder } = require("@/classes/ModelBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const {
  commonModels: {
    chatIdCommonModel,
    createdAtCommonModel,
    messageIdCommonModel,
    privateIdCommonModel,
  },
} = require("@/models/commonModels/commonModels");

const {
  chatErrors: {
    MESSAGE_TEXT_EMPTY,
    MESSAGE_TEXT_INVALID_TYPE,
    MESSAGE_TEXT_MAX_LENGTH_REACH,
    MESSAGE_TEXT_MIN_LENGTH_REACH,
    PARTICIPANT_EMPTY,
    PARTICIPANT_ID_EXIST,
    PARTICIPANT_ID_INVALID_TYPE,
    PARTICIPANT_ID_MAX_LENGTH_REACH,
    PARTICIPANT_ID_MIN_LENGTH_REACH,
    PARTICIPANT_ID_REQUIRED,
    SENDER_EMPTY,
    SENDER_ID_EXIST,
    SENDER_ID_INVALID_TYPE,
    SENDER_ID_MAX_LENGTH_REACH,
    SENDER_ID_MIN_LENGTH_REACH,
    SENDER_ID_REQUIRED,
  },
} = require("@/variables/errors/chatErrors");

const chatIdModel = chatIdCommonModel;
const createdAtModel = createdAtCommonModel;
const messageIdModel = messageIdCommonModel;

// const messageSenderModel = modelGenerator("1.0.0");

// const messageStatusModel = modelGenerator("1.0.0");

const messageModel = modelBuilder
  .create()
  .empty(false, MESSAGE_TEXT_EMPTY)
  .maxlength(20, MESSAGE_TEXT_MAX_LENGTH_REACH)
  .minlength(1, MESSAGE_TEXT_MIN_LENGTH_REACH)
  .type("string", MESSAGE_TEXT_INVALID_TYPE)
  .version("1.0.0")
  .build();

const participantIdModel = modelBuilder
  .create()
  .empty(privateIdCommonModel.empty.value, PARTICIPANT_EMPTY)
  .maxlength(
    privateIdCommonModel.maxlength.value,
    PARTICIPANT_ID_MAX_LENGTH_REACH
  )
  .minlength(
    privateIdCommonModel.minlength.value,
    PARTICIPANT_ID_MIN_LENGTH_REACH
  )
  .required(privateIdCommonModel.required.value, PARTICIPANT_ID_REQUIRED)
  .trim(privateIdCommonModel.trim.value)
  .type(privateIdCommonModel.type.value, PARTICIPANT_ID_INVALID_TYPE)
  .unique(privateIdCommonModel.unique.value, PARTICIPANT_ID_EXIST)
  .version("1.0.0")
  .build();

const senderIdModel = modelBuilder
  .create()
  .maxlength(privateIdCommonModel.maxlength.value, SENDER_ID_MAX_LENGTH_REACH)
  .minlength(privateIdCommonModel.minlength.value, SENDER_ID_MIN_LENGTH_REACH)
  .required(privateIdCommonModel.required.value, SENDER_ID_REQUIRED)
  .trim(privateIdCommonModel.trim.value)
  .type(privateIdCommonModel.type.value, SENDER_ID_INVALID_TYPE)
  .unique(privateIdCommonModel.unique.value, SENDER_ID_EXIST)
  .empty(privateIdCommonModel.empty.value, SENDER_EMPTY)
  .version("1.0.0")
  .build();

// const participantStatusModel = modelGenerator("1.0.0");

// const participantVisibilityModel = modelGenerator("1.0.0");

const models = {
  chatIdModel,
  createdAtModel,
  messageIdModel,
  messageModel,
  // messageSenderModel,
  // messageStatusModel,
  participantIdModel,
  // participantStatusModel,
  // participantVisibilityModel,
  senderIdModel,
};

const chatModels = {
  version: versionCalculator(extractVersions(models)),
  ...models,
};

module.exports = {
  chatModels,
};
