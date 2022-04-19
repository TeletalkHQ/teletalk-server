const path = require("path");

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

const { getEnvironment } = require("~/functions/utilities/utils");

const { environmentsKey } = require("~/variables/constants/environmentsKey");

if (getEnvironment(environmentsKey.NODE_ENV) === "test") {
  require("module-alias/register");
}

//* PrettyError is error prettier in terminal.
require("pretty-error").start();

require("dotenv").config({
  path: path.join(__dirname, "..", "environments", "main.env"),
});

//! Require this module before requiring internal modules
require("~/variables/globalVariables");

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

app.use((req, _, next) => {
  logger
    .blue("----------------")
    .bgBlue({ text: "Request arrived: ", textColor: logger.colors.black })
    .bgCyan({ text: req.url, textColor: logger.colors.black })
    .blue("----------------")
    .log();

  next();

  // logger
  //   .blue("----------------")
  //   .bgBlue({ text: "Request ended: ", textColor: logger.colors.black })
  //   .bgCyan({ text: req.url, textColor: logger.colors.black })
  //   .blue("----------------")
  //   .log();
});
app.use(morgan("dev"));

app.use(express.json());

//* Add errorCollector and errorResponser to "response object"
app.use((req, res, next) => {
  res.errors = {
    categorizedErrors: [],
    uncategorizedErrors: [],
    server: [],
    statusCode: 400,
    serverErrorsLength: 0,
    categorizedErrorsLength: 0,
    uncategorizedErrorsLength: 0,
  };

  res.errorCollector = ({ data }) => {
    errorCollectorMiddleware({ req, res, next, data });
  };

  next();
});

app.use((req, res, next) => {
  res.errorResponser = () => {
    errorResponserMiddleware(req, res, next);
  };

  next();
});

app.use(express.static("~/../public"));

app.use(serveFavicon("~/../public/assets/icons/favicon/favicon.ico"));

//* All routers is in lifeLine =>
app.use(lifeLine);

module.exports = { app };
