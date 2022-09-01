const {
  userErrors: { SELF_STUFF },
} = require("@/variables/errors/userErrors");

const selfStuffFailureTests = (configuredCustomRequest, data) => {
  it("should get error, TOKEN_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(data, SELF_STUFF);
  });
};

module.exports = { selfStuffFailureTests };
