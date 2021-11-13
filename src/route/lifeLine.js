//* All routers come into here =>

const { Router } = require("express");

const { userRoute } = require("~/route/userRoute/userRoute");
const { contactRoute } = require("~/route/contactRoute/contactRoute");
const { otherRoute } = require("~/route/otherRoute/otherRoute");

const {
	routeUserTemplate,
} = require("~/template/userTemplate/routeUserTemplate");

const {
	routeContactTemplate,
} = require("~/template/contactTemplate/routeContactTemplate");
const {
	routeOtherTemplate,
} = require("~/template/otherTemplate/routeOtherTemplate");

const lifeLine = Router();

lifeLine.get("/", (req, res) => {
	res.send("Hey! Welcome to teletalk <3");
});

lifeLine.use(routeUserTemplate.baseRoute, userRoute);

lifeLine.use(routeContactTemplate.baseRoute, contactRoute);

lifeLine.use(routeOtherTemplate.baseRoute, otherRoute);

module.exports = { lifeLine };
