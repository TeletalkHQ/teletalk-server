const { Router } = require("express");

const { otherRouter } = require("@/http/routers/other");
const { stuffRouter } = require("@/http/routers/stuff");

const { baseUrls } = require("@/http/routes/baseUrls");

const routers = {
  other: otherRouter,
  stuff: stuffRouter,
};

const lifeLine = Router();

lifeLine.use(baseUrls.other, routers.other);
lifeLine.use(baseUrls.stuff, routers.stuff);

module.exports = {
  lifeLine,
  routers,
};
