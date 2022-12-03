const { successTestBuilder } = require("$/classes/SuccessTestBuilder");

const { models } = require("@/models");

const chatModels = models.native.chat;

const privateChats = (
  { responseValue } = {},
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(chatModels.privateChats, undefined, responseValue)
    .setOptions({ modelCheck });

  builder.typeCheck().execute();

  //FIXME: Check all indexes like this
  responseValue.forEach((privateChat) => {
    //TODO: Add types to static variables
    builder
      .customTypeCheck(privateChat, "object")
      //TODO: Add all parts
      .setVariables(chatModels.chatId, undefined, privateChat.chatId)
      .typeCheck()
      .gteCheck()
      .lteCheck()
      .execute();
  });
};

module.exports = { privateChats };
