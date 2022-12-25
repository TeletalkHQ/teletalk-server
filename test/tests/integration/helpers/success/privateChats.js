const { successTestBuilder } = require("$/classes/SuccessTestBuilder");

const { models } = require("@/models");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const chatModels = models.native.chat;

const privateChatsSuccessTest = (
  { responseValue },
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(chatModels.privateChats, undefined, responseValue)
    .setOptions({ modelCheck });

  builder.typeCheck().run();

  responseValue.forEach((privateChat) => {
    builder
      .customTypeCheck(privateChat, FIELD_TYPE.OBJECT)
      //TODO: Add all parts
      .setVariables(chatModels.chatId, undefined, privateChat.chatId)
      .typeCheck()
      .gteCheck()
      .lteCheck()
      .run();
  });
};

module.exports = { privateChatsSuccessTest };
