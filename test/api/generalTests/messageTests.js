const { testBuilder } = require("@/classes/TestBuilder");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const {
  chatModels: { messageModel },
} = require("@/models/chatModels/chatModels");

const {
  chatErrors: {
    MESSAGE_TEXT_REQUIRED,
    MESSAGE_TEXT_MAX_LENGTH_REACH,
    // MESSAGE_TEXT_MIN_LENGTH_REACH,
    MESSAGE_TEXT_INVALID_TYPE,
  },
} = require("@/variables/errors/chatErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

// const messageMinLength = messageModel.minlength.value;
const messageMaxLength = messageModel.maxlength.value;

const messageSuccessTests = (
  { messageMain, messageTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  testBuilder
    .create()
    .setVariables(messageModel, messageMain, messageTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};
const messageFailureTests = (configuredCustomRequest, data) => {
  const fn = (message) => ({
    ...data,
    message,
  });

  it("Should get error, MESSAGE_TEXT_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(""),
      MESSAGE_TEXT_REQUIRED
    );
  });

  it("Should get error, MESSAGE_TEXT_MAX_LENGTH_REACH", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomString(messageMaxLength + 1)),
      MESSAGE_TEXT_MAX_LENGTH_REACH
    );
  });

  // it("Should get error, MESSAGE_TEXT_MIN_LENGTH_REACH", async () => {
  //   await configuredCustomRequest.sendFullFeaturedRequest(
  //     fn(randomMaker.randomString(messageMinLength - 1 || 1)),
  //     MESSAGE_TEXT_MIN_LENGTH_REACH
  //   );
  // });

  it("Should get error, MESSAGE_TEXT_INVALID_TYPE", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(123456789),
      MESSAGE_TEXT_INVALID_TYPE
    );
  });
};

module.exports = {
  messageSuccessTests,
  messageFailureTests,
};
