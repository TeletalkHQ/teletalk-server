const { Router } = require("express");

const {
  countriesOtherController,
} = require("@/controllers/otherControllers/countriesOtherController");
const {
  getWelcomeMessageOtherController,
} = require("@/controllers/otherControllers/getWelcomeMessageOtherController");

const {
  otherRoutes: { getCountriesRoute, getWelcomeMessageRoute },
} = require("@/variables/routes/otherRoutes");

const otherRouter = Router();

otherRouter[getWelcomeMessageRoute.method](
  getWelcomeMessageRoute.url,
  getWelcomeMessageOtherController
);

otherRouter[getCountriesRoute.method](
  getCountriesRoute.url,
  countriesOtherController
);

module.exports = { otherRouter };
