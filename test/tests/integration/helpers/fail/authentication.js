const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModels = models.native.user;

const tokenMaxlength = userModels.token.maxlength.value;
const tokenMinlength = userModels.token.minlength.value;

const authenticationFailTest = (configuredRequester, data = {}) => {
  const mergeOptions = (token) => ({ token });

  it("should get error: TOKEN_REQUIRED", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.TOKEN_REQUIRED,
      mergeOptions(undefined)
    );
  });
  it("should get error: TOKEN_INVALID_TYPE", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.TOKEN_INVALID_TYPE,
      mergeOptions(1234)
    );
  });
  it("should get error: TOKEN_MAXLENGTH_REACH", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.TOKEN_MAXLENGTH_REACH,
      mergeOptions(randomMaker.randomString(tokenMaxlength + 1))
    );
  });
  it("should get error: TOKEN_MINLENGTH_REACH", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.TOKEN_MINLENGTH_REACH,
      mergeOptions(randomMaker.randomString(+tokenMinlength - 1))
    );
  });
};

module.exports = { authenticationFailTest };
