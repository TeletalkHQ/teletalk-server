const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const userModels = models.native.user;
const chatModels = models.native.chat;

const chatsSuccessTests = (
  { chatsTest } = {},
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  const ts = successTestBuilder
    .create()
    .setVariables(userModels.chats, undefined, chatsTest)
    .setOptions({ modelCheck });

  ts.typeCheck().execute();

  ts.checkAndExecute(chatsTest.length, () => {
    const chat = chatsTest[0];
    //TODO: Add types to static variables
    ts.customTypeCheck(chat, "object")
      .setVariables(chatModels.chatId, undefined, chat.chatId)
      .typeCheck()
      .gteCheck()
      .lteCheck()
      .execute();
  });
};

//TODO: Add chats fail tests
const chatsFailureTests = () => {};

module.exports = { chatsFailureTests, chatsSuccessTests };
