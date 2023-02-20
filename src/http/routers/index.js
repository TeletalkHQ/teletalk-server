const { Router } = require("express");

const { stuffRouter } = require("@/http/routers/stuff");

const { baseUrls } = require("@/http/routes/baseUrls");

const routers = {
  stuff: stuffRouter,
};

const lifeLine = Router();

lifeLine.use(baseUrls.stuff, routers.stuff);

module.exports = {
  lifeLine,
  routers,
};
