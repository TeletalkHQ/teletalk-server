const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModels = models.native.user;

const authenticationFailTest = (configuredRequester, data = {}) => {
  const mergeOptions = (token) => ({ token });

  //TODO: Add tests for jwt parts
  it(
    failTestBuilder
      .create()
      .createTestMessage(errors.TOKEN_REQUIRED, configuredRequester.getRoute()),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.TOKEN_REQUIRED,
        mergeOptions()
      );
    }
  );
  it(
    failTestBuilder
      .create()
      .createTestMessage(
        errors.TOKEN_INVALID_TYPE,
        configuredRequester.getRoute()
      ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.TOKEN_INVALID_TYPE,
        mergeOptions(123456789)
      );
    }
  );
  it(
    failTestBuilder
      .create()
      //CLEANME
      .createTestMessage(
        errors.TOKEN_MAXLENGTH_REACH,
        configuredRequester.getRoute()
      ),
    async () => {
      const tokenMaxlength = userModels.token.maxlength.value;
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.TOKEN_MAXLENGTH_REACH,
        mergeOptions(randomMaker.string(tokenMaxlength + 1))
      );
    }
  );
  it(
    failTestBuilder
      .create()
      .createTestMessage(
        errors.TOKEN_MINLENGTH_REACH,
        configuredRequester.getRoute()
      ),
    async () => {
      const tokenMinlength = userModels.token.minlength.value;
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.TOKEN_MINLENGTH_REACH,
        mergeOptions(randomMaker.string(+tokenMinlength - 1))
      );
    }
  );
};

module.exports = { authenticationFailTest };
