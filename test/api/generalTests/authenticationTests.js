const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  userErrors: { TOKEN_REQUIRED, TOKEN_INVALID, TOKEN_INVALID_TYPE },
} = require("@/variables/errors/userErrors");

const authenticationFailureTests = (data = {}) => {
  it("should get error, TOKEN_REQUIRED", async () => {
    await customRequest.sendRequest(data, TOKEN_REQUIRED, {
      token: 123456879,
    });
  });
  it("should get error, TOKEN_INVALID_TYPE", async () => {
    await customRequest.sendRequest(data, TOKEN_INVALID_TYPE, {
      token: 123456879,
    });
  });
};

module.exports = { authenticationFailureTests };
