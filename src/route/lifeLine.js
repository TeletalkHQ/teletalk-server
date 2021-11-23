//* All routers come into here =>

const { Router } = require("express");

const { userRoute } = require("~/route/userRoute/userRoute");
const { cellphoneRoute } = require("~/route/cellphoneRoute/cellphoneRoute");
const { otherRoute } = require("~/route/otherRoute/otherRoute");

const { userRouteTemplate } = require("~/template/routeTemplate/userRouteTemplate");

const { cellphoneRouteTemplate } = require("~/template/routeTemplate/cellphoneRouteTemplate");
const { otherRouteTemplate } = require("~/template/otherTemplate/otherRouteTemplate");

const lifeLine = Router();

lifeLine.get("/", (req, res) => {
	res.send("Hey! Welcome to teletalk <3");
});

lifeLine.use(userRouteTemplate.baseRoute, userRoute);

lifeLine.use(cellphoneRouteTemplate.baseRoute, cellphoneRoute);

lifeLine.use(otherRouteTemplate.baseRoute, otherRoute);

module.exports = { lifeLine };
