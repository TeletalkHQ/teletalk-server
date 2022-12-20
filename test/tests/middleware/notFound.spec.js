const { routes } = require("$/routes");

const { makeCustomRequest } = require("$/utilities/requesters");

const { errors } = require("@/variables/errors");

describe("notFound middleware fail test", () => {
  it("should get error: ROUTE_NOT_FOUND", async () => {
    await makeCustomRequest(routes.test.unknownRoute)().sendFullFeaturedRequest(
      undefined,
      errors.ROUTE_NOT_FOUND
    );
  });
});
