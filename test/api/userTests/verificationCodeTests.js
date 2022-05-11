const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  userErrors: {
    VERIFICATION_CODE_REQUIRED,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID,
  },
} = require("@/variables/errors/userErrors");

const verificationCodeFailureTests = () => {
  it("it should get error, VERIFICATION_CODE_REQUIRED", async () => {
    await customRequest.sendRequest(
      {
        verificationCode: "",
      },
      VERIFICATION_CODE_REQUIRED
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID_TYPE", async () => {
    await customRequest.sendRequest(
      {
        verificationCode: "wrong type!",
      },
      VERIFICATION_CODE_INVALID_TYPE
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID_LENGTH", async () => {
    await customRequest.sendRequest(
      {
        verificationCode: "00000000000",
      },
      VERIFICATION_CODE_INVALID_LENGTH
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID", async () => {
    await customRequest.sendRequest(
      {
        verificationCode: "000000",
      },
      VERIFICATION_CODE_INVALID
    );
  });
};

module.exports = { verificationCodeFailureTests };
