const { requesters } = require("$/utilities/requesters");
const { errors } = require("@/variables/errors");

describe("notFound middleware fail test", () => {
  it("should get error: ROUTE_NOT_FOUND", async () => {
    await requesters
      .brokenRoute()
      .sendFullFeaturedRequest(undefined, errors.ROUTE_NOT_FOUND);
  });
});
