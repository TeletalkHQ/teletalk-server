//* All routers come into here =>

const { Router } = require("express");

const { errorResponser } = require("~/middlewares/errorResponser");

const {
  cellphoneRoute,
} = require("~/routers/cellphoneRouters/cellphoneRouter");
const { otherRoute } = require("~/routers/otherRouters/otherRouter");
const { privateChatRoute } = require("~/routers/chatRouters/privateChatRouter");
const { userRoute } = require("~/routers/userRouters/userRouter");
const {
  versionControlRouter,
} = require("~/routers/versionControlRouters/versionControlRouter");

const {
  cellphoneRouterTemplate,
} = require("~/templates/routerTemplates/cellphoneRouterTemplate");
const {
  otherRouterTemplate,
} = require("~/templates/routerTemplates/otherRouterTemplate");
const {
  privateChatRouterTemplate,
} = require("~/templates/routerTemplates/privateChatRouterTemplate");
const {
  userRouterTemplate,
} = require("~/templates/routerTemplates/userRouterTemplate");
const {
  versionControlRouterTemplate,
} = require("~/templates/routerTemplates/versionControlRouterTemplate");

const lifeLine = Router();

lifeLine.use(errorResponser);

lifeLine.use(cellphoneRouterTemplate.baseUrl.properties.route, cellphoneRoute);

lifeLine.use(otherRouterTemplate.baseUrl.properties.route, otherRoute);

lifeLine.use(
  privateChatRouterTemplate.baseUrl.properties.route,
  privateChatRoute
);

lifeLine.use(userRouterTemplate.baseUrl.properties.route, userRoute);

lifeLine.use(
  versionControlRouterTemplate.properties.baseUrl.properties.route,
  versionControlRouter
);

module.exports = { lifeLine };
