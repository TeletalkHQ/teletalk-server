const { Router } = require("express");

const {
  countriesOtherController,
} = require("~/controllers/otherControllers/countriesOtherController");
const {
  welcomeOtherController,
} = require("~/controllers/otherControllers/welcomeOtherController");

const {
  otherRoutes: {
    properties: {
      welcomeRoute: { properties: welcome },
      countriesRoute: { properties: countries },
    },
  },
} = require("~/variables/routes/otherRoutes");

const otherRouter = Router();

otherRouter[welcome.method](welcome.url, welcomeOtherController);

otherRouter[countries.method](countries.url, countriesOtherController);

module.exports = { otherRouter };
