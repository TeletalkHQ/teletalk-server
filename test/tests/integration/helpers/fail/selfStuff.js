const { errors } = require("@/variables/errors");

const selfStuffFailTest = (configuredRequester, data) => {
  it("should get error: SELF_STUFF", async () => {
    await configuredRequester.sendFullFeaturedRequest(data, errors.SELF_STUFF);
  });
};

module.exports = { selfStuffFailTest };
