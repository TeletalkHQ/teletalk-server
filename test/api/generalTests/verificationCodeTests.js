const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { testBuilder } = require("@/classes/TestBuilder");

const {
  userModels: { verificationCodeModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    VERIFICATION_CODE_INVALID,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_NUMERIC,
    VERIFICATION_CODE_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const verificationCodeLength = verificationCodeModel.length.value;

const verificationCodeSuccessTests = (
  { verificationCodeTest } = {},
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  testBuilder
    .create()
    .setVariables(verificationCodeModel, "", verificationCodeTest)
    .setOptions({ modelCheck })
    .typeCheck()
    .emptyCheck()
    .numericCheck()
    .lengthCheck()
    .execute();
};

const verificationCodeFailureTests = (configuredCustomRequest, data = {}) => {
  const fn = (verificationCode) => ({ ...data, verificationCode });

  it("it should get error, VERIFICATION_CODE_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(""),
      VERIFICATION_CODE_REQUIRED
    );
  });

  it("it should get error, VERIFICATION_CODE_NUMERIC", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn("verification code numeric!"),
      VERIFICATION_CODE_NUMERIC
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID_TYPE", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomNumber(verificationCodeLength)),
      VERIFICATION_CODE_INVALID_TYPE
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID_LENGTH", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomStringNumber(verificationCodeLength + 1)),
      VERIFICATION_CODE_INVALID_LENGTH
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomStringNumber(verificationCodeLength)),
      VERIFICATION_CODE_INVALID
    );
  });
};

module.exports = { verificationCodeFailureTests, verificationCodeSuccessTests };
