//* All routers come into here =>

const { Router } = require("express");

const { authRoute } = require("~/route/authRoute/authRoute");

const {
	routeAuthTemplate,
} = require("~/template/authTemplate/routeAuthTemplate");

const lifeline = Router();

lifeline.get("/", (req, res) => {
	res.send("Hey! Welcome to teletalk <3");
});

lifeline.use(routeAuthTemplate.baseRoute, authRoute);

exports.lifeline = lifeline;
