//* All routers come into here =>

const { Router } = require("express");

const { authRoute } = require("~/route/authRoute/authRoute");
const { contactRoute } = require("~/route/contactRoute/contactRoute");

const {
	routeUserTemplate,
} = require("~/template/userTemplate/routeUserTemplate");
const {
	routeContactTemplate,
} = require("~/template/contactTemplate/routeContactTemplate");

const lifeline = Router();

lifeline.get("/", (req, res) => {
	res.send("Hey! Welcome to teletalk <3");
});

lifeline.use(routeUserTemplate.baseRoute, authRoute);
lifeline.use(routeContactTemplate.baseRoute, contactRoute);

exports.lifeline = lifeline;
