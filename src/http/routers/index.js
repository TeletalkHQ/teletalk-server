const { Router } = require("express");

const { authRouter } = require("@/http/routers/auth");
const { otherRouter } = require("@/http/routers/other");
const { stuffRouter } = require("@/http/routers/stuff");
const { userRouter } = require("@/http/routers/user");

const { baseUrls } = require("@/http/routes/baseUrls");

const routers = {
  auth: authRouter,
  other: otherRouter,
  stuff: stuffRouter,
  user: userRouter,
};

const lifeLine = Router();

lifeLine.use(baseUrls.auth, routers.auth);
lifeLine.use(baseUrls.other, routers.other);
lifeLine.use(baseUrls.user, routers.user);
lifeLine.use(baseUrls.stuff, routers.stuff);

module.exports = {
  lifeLine,
  routers,
};
