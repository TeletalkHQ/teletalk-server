//! Require this module before requiring anything!
require("@/variables/globalVariables");

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

//* PrettyError is error prettier in terminal.
require("pretty-error").start();

require("@/functions/helpers/requireDotenv").requireDotenv();
require("@/configs/databaseConnecter").databaseConnecter();

const {
  sendJsonResponseMiddleware,
} = require("@/middlewares/sendJsonResponseMiddleware");
const { notFoundMiddleware } = require("@/middlewares/notFoundMiddleware");

const {
  requestDetailsLoggerMiddleware,
} = require("@/middlewares/requestDetailsLoggerMiddleware");
const {
  responseErrorHandlers,
} = require("@/middlewares/responseErrorHandlersMiddleware");

const { lifeLine } = require("@/routers/lifeLine");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestDetailsLoggerMiddleware);
app.use(morgan("dev"));

app.use(responseErrorHandlers);
app.use(sendJsonResponseMiddleware); //* This is should be after 'responseErrorHandlers'

app.use(express.static("@/../public"));

app.use(serveFavicon("@/../public/assets/icons/favicon/favicon.ico"));

//* All routers is in lifeLine =>
app.use(lifeLine);
app.use(notFoundMiddleware); //* 404

module.exports = { app };
