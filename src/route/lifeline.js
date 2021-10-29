//* All routes come into here =>

const { userRoute } = require("~/route/userRoute/userRoute");
const { Router } = require("express");

const lifeline = Router();

lifeline.use("/users", userRoute);

exports.lifeline = lifeline;
