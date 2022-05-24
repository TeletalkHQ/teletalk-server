const { testBuilder } = require("@/functions/testUtilities/TestBuilder");

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
  if (modelCheck) {
    testBuilder.setVariables(chatsModel, undefined, chatsTest).typeCheck();

    if (chatsTest.length) {
      //TODO Need to test
      const chat = chatsTest[0];

      testBuilder
        .customTypeCheck(chat, "object")
        .setVariables(chatIdModel, undefined, chat.chatId)
        .typeCheck()
        .gteCheck()
        .lteCheck()
        .execute();
    }
  }
};

const chatsFailureTests = () => {};

module.exports = { chatsFailureTests, chatsSuccessTests };
