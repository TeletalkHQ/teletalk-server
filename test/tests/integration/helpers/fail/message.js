const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const chatModels = models.native.chat;

const messageFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, chatModels.message, "message")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .maxlength()
    .minlength();
};

module.exports = {
  messageFailTest,
};
