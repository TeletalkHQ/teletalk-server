const { expect } = require("@/functions/testUtilities/testUtils");
const {
  chatModels: { chatIdModel },
} = require("@/models/chatModels/chatModels");
const {
  userModels: { chatsModel },
} = require("@/models/userModels/userModels");

const chatIdMinLength = chatIdModel.minlength.value;
const chatIdMaxLength = chatIdModel.maxlength.value;

const chatsSuccessTests = ({ chatsTest } = {}, { modelCheck } = {}) => {
  if (modelCheck) {
    expect(chatsTest).to.be.an(chatsModel.type.value);

    if (chatsTest.length) {
      const chat = chatsTest[0];
      const chatId = chat.chatId;
      const chatIdLength = chatIdLength;

      expect(chat).to.be.an("object");
      expect(chatId).to.be.an(chatIdModel.type.value);
      expect(chatIdLength).lessThanOrEqual(chatIdMaxLength);
      expect(chatIdLength).greaterThanOrEqual(chatIdMinLength);
    }
  }
};

const chatsFailureTests = () => {};

module.exports = { chatsFailureTests, chatsSuccessTests };
