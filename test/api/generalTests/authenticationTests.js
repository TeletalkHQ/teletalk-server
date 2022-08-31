const {
  userErrors: {
    TOKEN_REQUIRED,
    // TOKEN_INVALID_TYPE
  },
} = require("@/variables/errors/userErrors");

const authenticationFailureTests = (configuredCustomRequest, data = {}) => {
  //* Correct token maybe is set, so we need to break this down
  const fn = (token) => ({ token });

  it("should get error, TOKEN_REQUIRED", async () => {
    await configuredCustomRequest.sendRequest(
      data,
      TOKEN_REQUIRED,
      fn(undefined)
    );
  });
  it("should get error, TOKEN_INVALID_TYPE", async () => {
    // await configuredCustomRequest.sendRequest(
    //   data,
    //   TOKEN_INVALID_TYPE,
    //   fn(123456879)
    // );
  });
};

module.exports = { authenticationFailureTests };
