const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const {
  chatModels: { chatIdModel },
} = require("@/models/dataModels/chatModels");
const {
  userModels: { chatsModel },
} = require("@/models/dataModels/userModels");

const chatsSuccessTests = (
  { chatsTest } = {},
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  const ts = successTestBuilder
    .create()
    .setVariables(chatsModel, undefined, chatsTest)
    .setOptions({ modelCheck });

  ts.typeCheck().execute();

  ts.checkAndExecute(chatsTest.length, () => {
    const chat = chatsTest[0];
    //TODO: Add types to static variables
    ts.customTypeCheck(chat, "object")
      .setVariables(chatIdModel, undefined, chat.chatId)
      .typeCheck()
      .gteCheck()
      .lteCheck()
      .execute();
  });
};

//TODO: Add chats fail tests
const chatsFailureTests = () => {};

module.exports = { chatsFailureTests, chatsSuccessTests };
