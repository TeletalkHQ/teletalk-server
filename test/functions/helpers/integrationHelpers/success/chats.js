const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;
const chatModels = models.native.chat;

const chats = (
  { responseValue } = {},
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  const ts = successTestBuilder
    .create()
    .setVariables(userModels.chatInfo, undefined, responseValue)
    .setOptions({ modelCheck });

  ts.typeCheck().execute();

  ts.checkAndExecute(responseValue.length, () => {
    const chat = responseValue[0];
    //TODO: Add types to static variables
    ts.customTypeCheck(chat, "object")
      .setVariables(chatModels.chatId, undefined, chat.chatId)
      .typeCheck()
      .gteCheck()
      .lteCheck()
      .execute();
  });
};

module.exports = { chats };
