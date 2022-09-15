//! Require this modules before internal modules!
require("@/variables/others/customGlobals");
require("@/functions/helpers/requireDotenv").requireDotenv();
require("@/classes/AppConfigs");

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

//* PrettyError is error prettier in terminal.
require("pretty-error").start();

require("@/configs/databaseConnector").databaseConnector();

const {
  sendJsonResponseMiddleware,
} = require("@/middlewares/sendJsonResponseMiddleware");
const { notFoundMiddleware } = require("@/middlewares/notFoundMiddleware");
const {
  requestDetailsLoggerMiddleware,
} = require("@/middlewares/requestDetailsLoggerMiddleware");
const {
  responseErrorHandlersMiddleware,
} = require("@/middlewares/responseErrorHandlersMiddleware");
const {
  checkDataAndResponseMiddleware,
} = require("@/middlewares/checkDataAndResponseMiddleware");
const {
  checkBodyFieldsMiddleware,
} = require("@/middlewares/checkBodyFieldsMiddleware");
const {
  findRouteObjectMiddleware,
} = require("@/middlewares/findRouteObjectMiddleware");
const {
  ignoreMiddlewaresByUrlMiddleware,
} = require("@/middlewares/ignoreMiddlewaresByUrlMiddleware");
const {
  authDefaultMiddleware,
} = require("@/middlewares/authDefaultMiddleware");
const {
  requestMethodCheckerMiddleware,
} = require("@/middlewares/requestMethodCheckerMiddleware");

const { lifeLine } = require("@/routers/lifeLine");
const { getIgnoredUrlsForAuth } = require("./functions/helpers/otherHelpers");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestDetailsLoggerMiddleware);
app.use(morgan("dev"));
app.use(express.static("@/../public"));
app.use(serveFavicon("@/../public/assets/icons/favicon/favicon.ico"));

app.use(findRouteObjectMiddleware);
app.use(responseErrorHandlersMiddleware);
app.use(sendJsonResponseMiddleware); //* Should be after 'responseErrorHandlersMiddleware'
app.use(checkDataAndResponseMiddleware); //* Should be after 'sendJsonResponseMiddleware'
app.use(
  ignoreMiddlewaresByUrlMiddleware(
    getIgnoredUrlsForAuth(),
    authDefaultMiddleware
  )
); //* Should be after 'sendJsonResponseMiddleware'
app.use(notFoundMiddleware); //* Should be after 'sendJsonResponseMiddleware'
app.use(requestMethodCheckerMiddleware); //* Should be after 'notFoundMiddleware'
app.use(checkBodyFieldsMiddleware); //* Should be after 'requestMethodCheckerMiddleware'

//* All routers is in lifeLine =>
app.use(lifeLine);

module.exports = { app };
