const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

const {
  otherRoutes: { getCountriesRoute, getWelcomeMessageRoute },
} = require("@/variables/routes/otherRoutes");

const otherRouter = Router();

otherRouter[getWelcomeMessageRoute.method](
  getWelcomeMessageRoute.url,
  controllers.getWelcomeMessage
);

otherRouter[getCountriesRoute.method](
  getCountriesRoute.url,
  controllers.getCountries
);

module.exports = { otherRouter };
