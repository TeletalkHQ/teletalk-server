const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModels = models.native.user;

const tokenMaxlength = userModels.token.maxlength.value;
const tokenMinlength = userModels.token.minlength.value;

const authenticationFailTest = (configuredCustomRequest, data = {}) => {
  //* Correct token maybe is set, so we need to break this down
  const fn = (token) => ({ token });

  it("should get error: TOKEN_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.TOKEN_REQUIRED,
      fn(null)
    );
  });
  it("should get error: TOKEN_INVALID_TYPE", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.TOKEN_INVALID_TYPE,
      fn(1234)
    );
  });
  it("should get error: TOKEN_MAXLENGTH_REACH", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.TOKEN_MAXLENGTH_REACH,
      fn(randomMaker.randomString(tokenMaxlength + 1))
    );
  });
  it("should get error: TOKEN_MINLENGTH_REACH", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.TOKEN_MINLENGTH_REACH,
      fn(randomMaker.randomString(+tokenMinlength - 1))
    );
  });
};

module.exports = { authenticationFailTest };
