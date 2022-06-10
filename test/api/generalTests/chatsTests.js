const { testBuilder } = require("@/classes/TestBuilder");

const {
  chatModels: { chatIdModel },
} = require("@/models/chatModels/chatModels");
const {
  userModels: { chatsModel },
} = require("@/models/userModels/userModels");

const chatsSuccessTests = (
  { chatsTest } = {},
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  testBuilder
    .setVariables(chatsModel, undefined, chatsTest)
    .setOptions({ modelCheck })
    .typeCheck()
    .execute();

  testBuilder.checkAndExecute(chatsTest.length, () => {
    const chat = chatsTest[0];

    testBuilder
      .customTypeCheck(chat, "object")
      .setVariables(chatIdModel, undefined, chat.chatId)
      .typeCheck()
      .gteCheck()
      .lteCheck()
      .execute();
  });
};

const chatsFailureTests = () => {};

module.exports = { chatsFailureTests, chatsSuccessTests };
