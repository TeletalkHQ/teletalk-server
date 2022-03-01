//* All routers come into here =>

const { Router } = require("express");

const { errorResponser } = require("~/middlewares/errorResponser");

const { cellphoneRoute } = require("~/routers/cellphoneRouters/cellphoneRouter");
const { otherRoute } = require("~/routers/otherRouters/otherRouter");
const { privateChatRoute } = require("~/routers/chatRouters/privateChatRouter");
const { userRoute } = require("~/routers/userRouters/userRouter");

const {
	cellphoneRouteTemplate,
} = require("~/templates/routeTemplates/cellphoneRouteTemplate");
const { otherRouteTemplate } = require("~/templates/routeTemplates/otherRouteTemplate");
const {
	privateChatRouteTemplate,
} = require("~/templates/routeTemplates/privateChatRouteTemplate");
const { userRouteTemplate } = require("~/templates/routeTemplates/userRouteTemplate");

const lifeLine = Router();

lifeLine.use(errorResponser);

lifeLine.use(cellphoneRouteTemplate.baseUrl.properties.route, cellphoneRoute);

lifeLine.use(otherRouteTemplate.baseUrl.properties.route, otherRoute);

lifeLine.use(privateChatRouteTemplate.baseUrl.properties.route, privateChatRoute);

lifeLine.use(userRouteTemplate.baseUrl.properties.route, userRoute);

module.exports = { lifeLine };
