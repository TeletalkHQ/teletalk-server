const { Router } = require("express");

const { routers } = require("@/routers");
const { baseUrls } = require("@/routes/baseUrls");

const lifeLine = Router();

lifeLine.use(baseUrls.cellphone, routers.cellphone);
lifeLine.use(baseUrls.other, routers.other);
lifeLine.use(baseUrls.privateChat, routers.privateChat);
lifeLine.use(baseUrls.test, routers.test);
lifeLine.use(baseUrls.user, routers.user);
lifeLine.use(baseUrls.versionControl, routers.versionControl);

module.exports = { lifeLine };
