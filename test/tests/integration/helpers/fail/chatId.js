const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const chatModels = models.native.chat;

const chatIdFailTest = (configuredRequester, data = {}) => {
  failTestBuilder
    .create(configuredRequester, data, chatModels.chatId, "chatId")
    .missing()
    .overload()
    .invalidType()
    .empty.minlength()
    .maxlength();
};
module.exports = {
  chatIdFailTest,
};
