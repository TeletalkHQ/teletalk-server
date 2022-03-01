//* All routers come into here =>

const { Router } = require("express");

const { errorResponser } = require("~/middlewares/errorResponser");

const { cellphoneRoute } = require("~/routers/cellphoneRouters/cellphoneRouter");
const { otherRoute } = require("~/routers/otherRouters/otherRouter");
const { privateChatRoute } = require("~/routers/chatRouters/privateChatRouter");
const { userRoute } = require("~/routers/userRouters/userRouter");

const {
	cellphoneRouteTemplate,
} = require("~/templates/routerTemplates/cellphoneRouterTemplate");
const { otherRouteTemplate } = require("~/templates/routerTemplates/otherRouterTemplate");
const {
	privateChatRouteTemplate,
} = require("~/templates/routerTemplates/privateChatRouterTemplate");
const { userRouteTemplate } = require("~/templates/routerTemplates/userRouterTemplate");

const lifeLine = Router();

lifeLine.use(errorResponser);

lifeLine.use(cellphoneRouteTemplate.baseUrl.properties.route, cellphoneRoute);

lifeLine.use(otherRouteTemplate.baseUrl.properties.route, otherRoute);

lifeLine.use(privateChatRouteTemplate.baseUrl.properties.route, privateChatRoute);

lifeLine.use(userRouteTemplate.baseUrl.properties.route, userRoute);

module.exports = { lifeLine };
