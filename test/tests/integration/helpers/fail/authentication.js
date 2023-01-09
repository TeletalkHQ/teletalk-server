const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModels = models.native.user;

const authenticationFailTest = (configuredRequester, data = {}) => {
  const mergeOptions = (token) => ({ token });

  //TODO: Add tests for jwt parts
  it("should get error: TOKEN_REQUIRED", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.TOKEN_REQUIRED,
      mergeOptions()
    );
  });
  it("should get error: TOKEN_INVALID_TYPE", async () => {
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.TOKEN_INVALID_TYPE,
      mergeOptions(123456789)
    );
  });
  it("should get error: TOKEN_MAXLENGTH_REACH", async () => {
    const tokenMaxlength = userModels.token.maxlength.value;
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.TOKEN_MAXLENGTH_REACH,
      mergeOptions(randomMaker.string(tokenMaxlength + 1))
    );
  });
  it("should get error: TOKEN_MINLENGTH_REACH", async () => {
    const tokenMinlength = userModels.token.minlength.value;
    await configuredRequester.sendFullFeaturedRequest(
      data,
      errors.TOKEN_MINLENGTH_REACH,
      mergeOptions(randomMaker.string(+tokenMinlength - 1))
    );
  });
};

module.exports = { authenticationFailTest };
