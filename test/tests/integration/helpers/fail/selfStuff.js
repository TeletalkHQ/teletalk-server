const { errors } = require("@/variables/errors");

const selfStuffFailTest = (configuredRequester, data) => {
  //TODO: Add tests
  it("should get error: TOKEN_REQUIRED", async () => {
    await configuredRequester.sendFullFeaturedRequest(data, errors.SELF_STUFF);
  });
};

module.exports = { selfStuffFailTest };
