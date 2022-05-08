const { CustomRequest } = require("@/functions/helpers/CustomRequest");
const {
  userErrors: {
    properties: {
      VERIFICATION_CODE_REQUIRED: { properties: VERIFICATION_CODE_REQUIRED },
      VERIFICATION_CODE_INVALID_TYPE: {
        properties: VERIFICATION_CODE_INVALID_TYPE,
      },
      VERIFICATION_CODE_INVALID_LENGTH: {
        properties: VERIFICATION_CODE_INVALID_LENGTH,
      },
      VERIFICATION_CODE_INVALID: { properties: VERIFICATION_CODE_INVALID },
    },
  },
} = require("@/variables/errors/userErrors");

const verificationCodeFailureTests = () => {
  it("it should get error, VERIFICATION_CODE_REQUIRED", async () => {
    await CustomRequest.sendRequest(
      {
        verificationCode: "",
      },
      VERIFICATION_CODE_REQUIRED
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID_TYPE", async () => {
    await CustomRequest.sendRequest(
      {
        verificationCode: "wrong type!",
      },
      VERIFICATION_CODE_INVALID_TYPE
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID_LENGTH", async () => {
    await CustomRequest.sendRequest(
      {
        verificationCode: "00000000000",
      },
      VERIFICATION_CODE_INVALID_LENGTH
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID", async () => {
    await CustomRequest.sendRequest(
      {
        verificationCode: "000000",
      },
      VERIFICATION_CODE_INVALID
    );
  });
};

module.exports = { verificationCodeFailureTests };
