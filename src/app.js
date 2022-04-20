const path = require("path");

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");
// const madge = require("madge");

//* PrettyError is error prettier in terminal.
require("pretty-error").start();

require("dotenv").config({
  path: path.join(__dirname, "..", "environments", "main.env"),
});

// madge(
//   path.join(
//     __dirname,
//     "controllers",
//     "userControllers",
//     "verifySignInNormalUserController.js"
//   )
// )
//   .then((res) => {
//     console.log(res.circularGraph());
//     console.log(res.circular());
//     console.log(res.warnings());
//     console.log(res.obj());
//     console.log(res.orphans());
//     // console.log(res.depends(""));
//     console.log(res.leaves());

//     return res.dot();
//   })
//   .then((output) => {
//     console.log(output);
//   });

//! Require this module before requiring internal modules
require("~/variables/globalVariables");

const { getEnvironment } = require("~/functions/utilities/utilsNoDeps");

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
app.use((_, res, next) => {
  res.errors = {
    errors: {},
    statusCode: 500, //? Default error status code
  };

  res.errorCollector = (errorObject) => {
    errorCollectorMiddleware({ res, errorObject });
  };

  next();
});

app.use((_, res, next) => {
  res.errorResponser = () => {
    errorResponserMiddleware(res);
  };

  next();
});

app.use(express.static("~/../public"));

app.use(serveFavicon("~/../public/assets/icons/favicon/favicon.ico"));

//* All routers is in lifeLine =>
app.use(lifeLine);

module.exports = { app };
