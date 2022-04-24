const path = require("path");

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

//* PrettyError is error prettier in terminal.
require("pretty-error").start();

require("dotenv").config({
  path: path.join(__dirname, "..", "environments", "main.env"),
});

//! Require this module before requiring internal modules
require("~/variables/globalVariables");

require("~/configs/connectDatabase").connectDatabase();

const {
  getEnvironment,
  getStatusCodeFromRoute,
} = require("~/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
  ENVIRONMENT_VALUES,
} = require("~/variables/constants/environmentInitialValues");

if (
  getEnvironment(ENVIRONMENT_KEYS.NODE_ENV) === ENVIRONMENT_VALUES.NODE_ENV.test
) {
  require("module-alias/register");
}

const {
  errorCollectorMiddleware,
} = require("~/middlewares/errorCollectorMiddleware");
const {
  errorResponserMiddleware,
} = require("~/middlewares/errorResponserMiddleware");

const { lifeLine } = require("~/routers/lifeLine");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use((req, _, next) => {
  logger
    .blue("----------------")
    .bgBlue({ text: "Request arrived: ", textColor: logger.colors.black })
    .bgCyan({ text: req.url, textColor: logger.colors.black })
    .blue("----------------")
    .log();

  logger
    .red("----------------------------------------------------------------")
    .log();

  logger.log(req.body);

  logger
    .red("----------------------------------------------------------------")
    .log();

  next();

  // logger
  //   .blue("----------------")
  //   .bgBlue({ text: "Request ended: ", textColor: logger.colors.black })
  //   .bgCyan({ text: req.url, textColor: logger.colors.black })
  //   .blue("----------------")
  //   .log();
});

//* Add errorCollector and errorResponser to "response object"
app.use((_, res, next) => {
  res.errors = {
    errors: {},
    statusCode: 500, //? Default error status code
  };

  res.errorCollector = (errorObject) => {
    errorCollectorMiddleware(res, errorObject);
  };

  next();
});
app.use((_, res, next) => {
  res.errorResponser = () => {
    errorResponserMiddleware(res);
  };

  next();
});

app.use((_, res, next) => {
  res.sendJsonResponse = (routeObject, data) => {
    res.status(getStatusCodeFromRoute(routeObject)).json(data);
  };

  next();
});

app.use(express.static("~/../public"));

app.use(serveFavicon("~/../public/assets/icons/favicon/favicon.ico"));

//* All routers is in lifeLine =>
app.use(lifeLine);

module.exports = { app };
