const { expect } = require("chai");

const { requesterCreator } = require("$/classes/requester/Requester");

const { arrayOfRoutes } = require("@/routes");
const { routes } = require("$/routes");

const { errors } = require("@/variables/errors");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const requester = (routeObject) => requesterCreator().create(routeObject);

describe("notFound middleware fail test", () => {
  it("should get error: ROUTE_NOT_FOUND", async () => {
    await requester(routes.test.unknownRoute).sendFullFeaturedRequest(
      undefined,
      errors.ROUTE_NOT_FOUND
    );
  });

  for (const route of arrayOfRoutes) {
    it(`should not get error: ROUTE_NOT_FOUND - ${route.fullUrl}`, async () => {
      const { response } = await requester(route).sendRequest();

      const { errors: responseErrors } = response.body;

      const { errorKey } = errors.ROUTE_NOT_FOUND;
      if (responseErrors && responseErrors[errorKey]) {
        expect(responseErrors[errorKey].reason).to.be.an(FIELD_TYPE.STRING);
        expect(responseErrors[errorKey].reason).not.equal(
          errors.ROUTE_NOT_FOUND.reason
        );
      }
    });
  }
});
