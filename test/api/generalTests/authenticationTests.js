const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { models } = require("@/models/models");

const {
  userErrors: {
    TOKEN_MAXLENGTH_REACH,
    TOKEN_MINLENGTH_REACH,
    // TOKEN_INVALID_TYPE,
    TOKEN_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const userModels = models.native.user;

const tokenMaxlength = userModels.token.maxlength.value;
const tokenMinlength = userModels.token.minlength.value;

const authenticationFailureTests = (configuredCustomRequest, data = {}) => {
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
  it("should get error, TOKEN_MAXLENGTH_REACH", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      TOKEN_MAXLENGTH_REACH,
      fn(randomMaker.randomString(tokenMaxlength + 1))
    );
  });
  it("should get error, TOKEN_MINLENGTH_REACH", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      TOKEN_MINLENGTH_REACH,
      fn(randomMaker.randomString(+tokenMinlength - 1))
    );
  });
};

module.exports = { authenticationFailureTests };
