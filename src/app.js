//! Require this module before requiring anything!
require("~/variables/globalVariables");

const path = require("path");

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

//* PrettyError is error prettier in terminal.
require("pretty-error").start();

require("dotenv").config({
  path: path.join(
    __dirname,
    "..",
    "environments",
    `${process.env.NODE_ENV}.env`
  ),
});

require("~/configs/connectDatabase").connectDatabase();

const {
  errorCollectorMiddleware,
} = require("~/middlewares/errorCollectorMiddleware");
const {
  errorResponserMiddleware,
} = require("~/middlewares/errorResponserMiddleware");
const { sendJsonResponse } = require("~/middlewares/sendJsonResponse");

const { lifeLine } = require("~/routers/lifeLine");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use((req, _, next) => {
  logger
    .blue("--------------------------------")
    .bgBlue({ text: "Request arrived: ", textColor: logger.colors.black })
    .bgCyan({ text: req.url, textColor: logger.colors.black })
    .blue("--------------------------------")
    .log();

  logger
    .red(
      "---------------------------------------------------------------------------------------------------------------------"
    )
    .log();
  logger.log("request body: ", req.body);
  logger
    .red(
      "---------------------------------------------------------------------------------------------------------------------"
    )
    .log();

  next();
});

app.use((_, res, next) => {
  res.errors = {
    errors: {},
    statusCode: 500,
  };

  res.errorCollector = (errorObject) => {
    errorCollectorMiddleware(res, errorObject);
  };
  res.errorResponser = () => {
    errorResponserMiddleware(res);
  };

  next();
});

app.use(sendJsonResponse);

app.use(express.static("~/../public"));

app.use(serveFavicon("~/../public/assets/icons/favicon/favicon.ico"));

//* All routers is in lifeLine =>
app.use(lifeLine);

// app.use((req, res, next) => {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   const error = {
//     error: err,
//     code: err.status,
//     success: false,
//   };

//   res.json(error);
// });

module.exports = { app };
