const { customRequest } = require("@/functions/helpers/CustomRequest");
const { randomMaker } = require("@/functions/helpers/RandomMaker");
const { testBuilder } = require("@/functions/testUtilities/TestBuilder");

const {
  chatModels: { chatIdModel },
} = require("@/models/chatModels/chatModels");

const {
  chatErrors: {
    CHAT_ID_INVALID_TYPE,
    CHAT_ID_MAX_LENGTH_REACH,
    CHAT_ID_MIN_LENGTH_REACH,
    CHAT_ID_REQUIRED,
  },
} = require("@/variables/errors/chatErrors");

const chatIdSuccessTests = (
  { chatIdMain, chatIdTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder
    .setVariables(chatIdModel, chatIdMain, chatIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

const chatIdMinLength = chatIdModel.minlength.value;
const chatIdMaxLength = chatIdModel.maxlength.value;

const chatIdFailureTests = (data = {}) => {
  const fn = (chatId) => ({ ...data });

  it("Should get error, CHAT_ID_REQUIRED", async () => {
    await customRequest.sendRequest(fn(undefined), CHAT_ID_REQUIRED);
  });

  it("Should get error, CHAT_ID_INVALID_TYPE", async () => {
    await customRequest.sendRequest(fn(12365475), CHAT_ID_INVALID_TYPE);
  });

  it("Should get error, CHAT_ID_MAX_LENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomString(+chatIdMaxLength + 1)),
      CHAT_ID_MAX_LENGTH_REACH
    );
  });

  it("Should get error, CHAT_ID_MIN_LENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomString(+chatIdMinLength - 1)),
      CHAT_ID_MIN_LENGTH_REACH
    );
  });
};
module.exports = {
  chatIdSuccessTests,
  chatIdFailureTests,
};
