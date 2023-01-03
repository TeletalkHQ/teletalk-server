const { makeRequester } = require("$/utilities/requesters");

const { arrayOfRoutes, routes } = require("@/routes");

const { errors } = require("@/variables/errors");

describe("checkBodyFields middleware tests", () => {
  //? Filter routes which has at least one input field
  const routesWithInputFields = arrayOfRoutes.filter(
    (i) => Object.keys(i.inputFields).length
  );

  const routesWithoutAuth = routesWithInputFields.filter(
    (i) =>
      ![
        routes.auth.signIn.fullUrl,
        routes.auth.verify.fullUrl,
        routes.auth.createNewUser.fullUrl,
      ].includes(i.fullUrl)
  );

  for (const route of routesWithoutAuth) {
    it(`should get error: INPUT_FIELDS_MISSING - ${route.fullUrl}`, async () => {
      await makeRequester(route)().sendFullFeaturedRequest(
        undefined,
        errors.INPUT_FIELDS_MISSING,
        { shouldFilterRequestData: false }
      );
    });
  }
});
