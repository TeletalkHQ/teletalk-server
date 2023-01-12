const { failTestBuilder } = require("$/classes/FailTestBuilder");
const { errors } = require("@/variables/errors");

const selfStuffFailTest = (configuredRequester, data) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(errors.SELF_STUFF, configuredRequester.getRoute()),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.SELF_STUFF
      );
    }
  );
};

module.exports = { selfStuffFailTest };
