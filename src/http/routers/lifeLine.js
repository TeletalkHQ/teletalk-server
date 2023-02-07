const { Router } = require("express");

const { routers } = require("@/http/routers");

const { baseUrls } = require("@/http/routes/baseUrls");

const lifeLine = Router();

lifeLine.use(baseUrls.auth, routers.auth);
lifeLine.use(baseUrls.other, routers.other);
lifeLine.use(baseUrls.privateChat, routers.privateChat);
lifeLine.use(baseUrls.user, routers.user);
lifeLine.use(baseUrls.stuff, routers.stuff);

module.exports = { lifeLine };
