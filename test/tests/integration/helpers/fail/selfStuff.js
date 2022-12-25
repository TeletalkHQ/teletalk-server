const { errors } = require("@/variables/errors");

const selfStuffFailTest = (configuredCustomRequest, data) => {
  //TODO: Add tests
  it("should get error: TOKEN_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.SELF_STUFF
    );
  });
};

module.exports = { selfStuffFailTest };
