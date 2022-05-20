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
require("@/configs/databaseConnector").databaseConnector();

const { concatBaseUrlWithUrl } = require("@/functions/utilities/utils");

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
  checkAndResponseMiddleware,
} = require("@/middlewares/checkAndResponseMiddleware");

const { lifeLine } = require("@/routers/lifeLine");
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
  userRoutes: { signInNormalRoute, userRouteBaseUrl },
} = require("@/variables/routes/userRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestDetailsLoggerMiddleware);
app.use(morgan("dev"));

//? Add your global middleware for routes here, in special cases you can ignore middleware by url

app.use(findRouteObjectMiddleware);
app.use(responseErrorHandlersMiddleware);
app.use(
  ignoreMiddlewaresByUrlMiddleware(
    [concatBaseUrlWithUrl(userRouteBaseUrl, signInNormalRoute)],
    authDefaultMiddleware
  )
); //* Should be after 'responseErrorHandlersMiddleware'
app.use(sendJsonResponseMiddleware); //* Should be after 'responseErrorHandlersMiddleware'
app.use(checkAndResponseMiddleware); //* Should be after 'sendJsonResponseMiddleware'
app.use(notFoundMiddleware); //* Should be after 'checkAndResponseMiddleware'
app.use(checkBodyFieldsMiddleware); //* Should be after 'notFoundMiddleware'

app.use(express.static("@/../public"));
app.use(serveFavicon("@/../public/assets/icons/favicon/favicon.ico"));

//* All routers is in lifeLine =>
app.use(lifeLine);

module.exports = { app };
