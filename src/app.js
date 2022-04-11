const path = require("path");

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

const { bodyClarify } = require("~/middlewares/bodyClarify");
const { errorCollector } = require("~/middlewares/errorCollector");
const { errorResponser } = require("~/middlewares/errorResponser");

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
app.use(bodyClarify);

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
    errorCollector({ req, res, next, data });
  };

  next();
});

app.use((req, res, next) => {
  res.errorResponser = () => {
    errorResponser(req, res, next);
  };

  next();
});

app.use(express.static("~/../public"));

app.use(serveFavicon("~/../public/assets/icons/favicon/favicon.ico"));

//* All routers is in lifeLine =>
app.use(lifeLine);

module.exports = { app };
