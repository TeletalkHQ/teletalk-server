const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  userErrors: { TOKEN_REQUIRED, TOKEN_INVALID, TOKEN_INVALID_TYPE },
} = require("@/variables/errors/userErrors");

const authenticationFailureTests = (data = {}) => {
  it("should get error, TOKEN_REQUIRED", async () => {
    const response = await customRequest.sendRequest(
      data,
      TOKEN_REQUIRED,
      true
    );

    logger.log(response.data);
  });
};

module.exports = { authenticationFailureTests };
