const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const chatModels = models.native.chat;

const messageFailTest = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(configuredCustomRequest, data, chatModels.message, "message")
    .required(errors.MESSAGE_TEXT_REQUIRED)
    .maxlength(errors.MESSAGE_TEXT_MAX_LENGTH_REACH)
    .minlength(errors.MESSAGE_TEXT_MIN_LENGTH_REACH)
    .invalidType_typeIsString(errors.MESSAGE_TEXT_INVALID_TYPE);
};

module.exports = {
  messageFailTest,
};
