const { expect } = require("@/functions/utilities/testUtils");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  userModels: { verificationCodeModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    VERIFICATION_CODE_REQUIRED,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID,
  },
} = require("@/variables/errors/userErrors");

const verificationCodeLength = verificationCodeModel.length.value;

const verificationCodeSuccessTests = (
  { verificationCodeMain, verificationCodeTest } = {},
  { stringEquality, modelCheck } = {}
) => {
  // if (stringEquality) {
  //   expect(verificationCodeTest.length).equal(verificationCodeMain.length);
  //   expect(verificationCodeMain).equal(verificationCodeTest);
  // }

  if (modelCheck) {
    expect(verificationCodeTest).to.be.an(verificationCodeModel.type.value);

    if (verificationCodeModel.empty.value === false)
      expect(verificationCodeTest.length).to.be.greaterThan(0);

    expect(+verificationCodeTest).to.be.an("number");

    expect(verificationCodeTest.length).equal(verificationCodeLength);
  }
};

const verificationCodeFailureTests = (data = {}) => {
  const fn = (verificationCode) => ({ ...data, verificationCode });

  it("it should get error, VERIFICATION_CODE_REQUIRED", async () => {
    await customRequest.sendRequest(fn(""), VERIFICATION_CODE_REQUIRED);
  });

  it("it should get error, VERIFICATION_CODE_INVALID_TYPE", async () => {
    await customRequest.sendRequest(
      fn("wrong type!"),
      VERIFICATION_CODE_INVALID_TYPE
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID_LENGTH", async () => {
    await customRequest.sendRequest(
      fn("00000000000"),
      VERIFICATION_CODE_INVALID_LENGTH
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID", async () => {
    await customRequest.sendRequest(fn("000000"), VERIFICATION_CODE_INVALID);
  });
};

module.exports = { verificationCodeFailureTests, verificationCodeSuccessTests };
