const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  userErrors: { TOKEN_REQUIRED, TOKEN_INVALID_TYPE },
} = require("@/variables/errors/userErrors");

const authenticationFailureTests = (data = {}) => {
  const fn = (token) => ({ token });
  it("should get error, TOKEN_REQUIRED", async () => {
    await customRequest.sendRequest(data, TOKEN_REQUIRED, fn(undefined));
  });
  it("should get error, TOKEN_INVALID_TYPE", async () => {
    await customRequest.sendRequest(data, TOKEN_INVALID_TYPE, fn(123456879));
  });
};

module.exports = { authenticationFailureTests };
