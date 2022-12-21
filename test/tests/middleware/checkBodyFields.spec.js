const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

const { makeCustomRequest } = require("$/utilities/requesters");

const { arrayOfRoutes, routes } = require("@/routes");

const { errors } = require("@/variables/errors");

describe("checkBodyFields middleware tests", () => {
  //? Filter routes has at least one input field
  const routesWithInputFields = arrayOfRoutes.filter(
    (i) => objectUtilities.objectKeys(i.inputFields).length
  );

  const routesWithoutAuthRoutes = routesWithInputFields.filter(
    (i) =>
      ![
        routes.user.signIn.fullUrl,
        routes.user.verify.fullUrl,
        routes.user.createNewUser.fullUrl,
      ].includes(i.fullUrl)
  );

  it("should get error: INPUT_FIELDS_MISSING", async () => {
    for (const route of routesWithoutAuthRoutes) {
      await makeCustomRequest(route)().sendFullFeaturedRequest(
        undefined,
        errors.INPUT_FIELDS_MISSING,
        { filterDataCondition: false }
      );
    }
  });
});
