const { customRequest } = require("@/classes/CustomRequest");
const {
  userErrors: {
    TOKEN_REQUIRED,
    // TOKEN_INVALID_TYPE
  },
} = require("@/variables/errors/userErrors");

const authenticationFailureTests = (
  configuredCustomRequest = customRequest().create(),
  data = {}
) => {
  //* Correct token maybe is set, so we need to break this down
  const fn = (token) => ({ token });

  it("should get error, TOKEN_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      TOKEN_REQUIRED,
      fn(null)
    );
  });
  it("should get error, TOKEN_INVALID_TYPE", async () => {
    // await configuredCustomRequest.sendFullFeaturedRequest(
    //   data,
    //   TOKEN_INVALID_TYPE,
    //   fn(123456879)
    // );
  });
};

module.exports = { authenticationFailureTests };
