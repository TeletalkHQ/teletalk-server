const { errors } = require("@/variables/errors/errors");

const selfStuff = (configuredCustomRequest, data) => {
  it("should get error, TOKEN_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.SELF_STUFF
    );
  });
};

module.exports = { selfStuff };
