const { Router } = require("express");

const {
  countriesOtherController,
} = require("@/controllers/otherControllers/countriesOtherController");
const {
  getWelcomeMessageOtherController,
} = require("@/controllers/otherControllers/getWelcomeMessageOtherController");

const {
  otherRoutes: { countriesRoute, welcomeRoute },
} = require("@/variables/routes/otherRoutes");

const otherRouter = Router();

otherRouter[welcomeRoute.method](
  welcomeRoute.url,
  getWelcomeMessageOtherController
);

otherRouter[countriesRoute.method](
  countriesRoute.url,
  countriesOtherController
);

module.exports = { otherRouter };
