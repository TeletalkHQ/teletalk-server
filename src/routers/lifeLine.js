const { Router } = require("express");

const { routers } = require("@/routers");

const { baseUrls } = require("@/routes/baseUrls");

const lifeLine = Router();

lifeLine.use(baseUrls.auth, routers.auth);
lifeLine.use(baseUrls.other, routers.other);
lifeLine.use(baseUrls.privateChat, routers.privateChat);
lifeLine.use(baseUrls.user, routers.user);
lifeLine.use(baseUrls.stuff, routers.stuff);

module.exports = { lifeLine };
