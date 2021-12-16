//* All routers come into here =>

const { Router } = require("express");

const { errorResponser } = require("~/middleware/errorResponser");

const { cellphoneRoute } = require("~/route/cellphoneRoute/cellphoneRoute");
const { otherRoute } = require("~/route/otherRoute/otherRoute");
const { privateChatRoute } = require("~/route/chatRoute/privateChatRoute");
const { userRoute } = require("~/route/userRoute/userRoute");

const { cellphoneRouteTemplate } = require("~/template/routeTemplate/cellphoneRouteTemplate");
const { otherRouteTemplate } = require("~/template/routeTemplate/otherRouteTemplate");
const {
	privateChatRouteTemplate,
} = require("~/template/routeTemplate/privateChatRouteTemplate");
const { userRouteTemplate } = require("~/template/routeTemplate/userRouteTemplate");

const lifeLine = Router();

lifeLine.use(errorResponser);

lifeLine.use(cellphoneRouteTemplate.baseRoute, cellphoneRoute);

lifeLine.use(otherRouteTemplate.baseRoute, otherRoute);

lifeLine.use(privateChatRouteTemplate.baseRoute, privateChatRoute);

lifeLine.use(userRouteTemplate.baseRoute, userRoute);

module.exports = { lifeLine };
