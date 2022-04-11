//* All routers come into here =>

const { Router } = require("express");

const {
  cellphoneRoute,
} = require("~/routers/cellphoneRouters/cellphoneRouter");
const { otherRoute } = require("~/routers/otherRouters/otherRouter");
const { privateChatRoute } = require("~/routers/chatRouters/privateChatRouter");
const { userRoute } = require("~/routers/userRouters/userRouter");
const {
  versionControlRouter,
} = require("~/routers/versionControlRouters/versionControlRouter");

const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");
const { otherRoutes } = require("~/variables/routes/otherRoutes");
const { privateChatRoutes } = require("~/variables/routes/privateChatRoutes");
const { userRoutes } = require("~/variables/routes/userRoutes");
const {
  versionControlRoutes,
} = require("~/variables/routes/versionControlRoutes");

const lifeLine = Router();

lifeLine.use(cellphoneRoutes.baseUrl.properties.url, cellphoneRoute);

lifeLine.use(otherRoutes.baseUrl.properties.url, otherRoute);

lifeLine.use(privateChatRoutes.baseUrl.properties.url, privateChatRoute);

lifeLine.use(userRoutes.baseUrl.properties.url, userRoute);

lifeLine.use(
  versionControlRoutes.properties.baseUrl.properties.url,
  versionControlRouter
);

module.exports = { lifeLine };
