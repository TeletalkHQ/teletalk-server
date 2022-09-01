const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { testBuilder } = require("@/classes/TestBuilder");

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
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const chatIdSuccessTests = (
  { chatIdMain, chatIdTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  testBuilder
    .create()
    .setVariables(chatIdModel, chatIdMain, chatIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

const chatIdMinLength = chatIdModel.minlength.value;
const chatIdMaxLength = chatIdModel.maxlength.value;

const chatIdFailureTests = (configuredCustomRequest, data = {}) => {
  const fn = (chatId) => ({ ...data, chatId });

  it("Should get error, CHAT_ID_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(""),
      CHAT_ID_REQUIRED
    );
  });

  it("Should get error, CHAT_ID_INVALID_TYPE", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(12365475),
      CHAT_ID_INVALID_TYPE
    );
  });

  it("Should get error, CHAT_ID_MAX_LENGTH_REACH", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomString(+chatIdMaxLength + 1)),
      CHAT_ID_MAX_LENGTH_REACH
    );
  });

  it("Should get error, CHAT_ID_MIN_LENGTH_REACH", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomString(+chatIdMinLength - 1)),
      CHAT_ID_MIN_LENGTH_REACH
    );
  });
};
module.exports = {
  chatIdSuccessTests,
  chatIdFailureTests,
};
