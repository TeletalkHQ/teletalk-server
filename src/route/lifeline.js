//* All routes come into here =>

const { Router } = require("express");

const { userRouter } = require("~/route/user/userRoute");

const lifeline = Router();

lifeline.use(userRouter);

exports.lifeline = lifeline;
