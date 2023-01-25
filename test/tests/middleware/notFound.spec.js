const { expect } = require("chai");

const { failTestBuilder } = require("$/classes/FailTestBuilder");
const { requesterCreator } = require("$/classes/Requester");

const { arrayOfRoutes } = require("@/routes");
const { routes } = require("$/routes");

const { errors } = require("@/variables/errors");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const requester = (route) => requesterCreator().create(route);

describe("notFound middleware fail test", () => {
  const message = failTestBuilder
    .create()
    .createTestMessage(
      errors.ROUTE_NOT_FOUND,
      routes.test.unknownRoute.fullUrl
    );
  it(message, async () => {
    await requester(routes.test.unknownRoute)
      .setError(errors.ROUTE_NOT_FOUND)
      .sendFullFeaturedRequest();
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
