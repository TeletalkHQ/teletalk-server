const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

//! Require this module before internal modules!
require("@/variables/others/globalVariables");

//* PrettyError is error prettier in terminal.
require("pretty-error").start();

require("@/functions/helpers/requireDotenv").requireDotenv();
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
  checkAndResponseMiddleware,
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

const { lifeLine } = require("@/routers/lifeLine");

const {
  userRoutes: { signInNormalRoute },
} = require("@/variables/routes/userRoutes");
const {
  versionControlRoutes: { getAllStuffsRoute },
} = require("@/variables/routes/versionControlRoutes");
const {
  otherRoutes: { countriesRoute, welcomeRoute },
} = require("@/variables/routes/otherRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestDetailsLoggerMiddleware);
app.use(morgan("dev"));

app.use(findRouteObjectMiddleware);
app.use(notFoundMiddleware);
app.use(responseErrorHandlersMiddleware);

const arrayOfFullUrl = [
  signInNormalRoute,
  getAllStuffsRoute,
  welcomeRoute,
  countriesRoute,
].map((item) => item.fullUrl);
app.use(
  ignoreMiddlewaresByUrlMiddleware(arrayOfFullUrl, authDefaultMiddleware)
); //* Should be after 'responseErrorHandlersMiddleware'

app.use(sendJsonResponseMiddleware); //* Should be after 'responseErrorHandlersMiddleware'
app.use(checkBodyFieldsMiddleware); //* Should be after 'notFoundMiddleware'
app.use(checkAndResponseMiddleware); //* Should be after 'notFoundMiddleware'

app.use(express.static("@/../public"));
app.use(serveFavicon("@/../public/assets/icons/favicon/favicon.ico"));

//* All routers is in lifeLine =>
app.use(lifeLine);

module.exports = { app };
