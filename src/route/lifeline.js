//* All routes come into here =>

const { Router } = require("express");

const { userRoute } = require("~/route/userRoute/userRoute");
const { errorRoute } = require("~/route/errorRoute/userErrorRoute");
const { templateRoute } = require("~/route/templateRoute/userTemplateRoute");

const lifeline = Router();

lifeline.use("/user", userRoute);

lifeline.use("/error", errorRoute);

lifeline.use("/template", templateRoute);

exports.lifeline = lifeline;
