const { Router } = require("express");

const {
  welcomeOtherController,
} = require("~/controllers/otherControllers/welcomeOtherController");
const {
  otherRoutes: {
    welcome: { properties: welcome },
  },
} = require("~/variables/routes/otherRoutes");

const otherRouter = Router();

otherRouter[welcome.method](welcome.url, welcomeOtherController);

module.exports = { otherRouter };
