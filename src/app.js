const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

//* PrettyError is error prettier in terminal.
require("pretty-error").start();

const { getIgnoredUrlsForAuth } = require("@/helpers/otherHelpers");

const { lifeLine } = require("@/routers/lifeLine");

const { middlewares } = require("@/middlewares");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(middlewares.requestDetailsLogger);
app.use(morgan("dev"));

app.use(express.static("public"));
//TODO: Update favicon
app.use(serveFavicon("public/assets/icons/favicon/favicon.ico"));

app.use(middlewares.findRouteObject);
app.use(middlewares.responseErrorHandlers);
app.use(middlewares.sendJsonResponse); //* Should be after 'responseErrorHandlers'
app.use(middlewares.checkDataAndResponse); //* Should be after 'sendJsonResponse'
app.use(middlewares.notFound); //* Should be after 'sendJsonResponse'
app.use(
  middlewares.ignoreMiddlewaresByUrl(
    getIgnoredUrlsForAuth(),
    middlewares.authDefault
  )
); //* Should be after 'sendJsonResponse'
app.use(middlewares.requestMethodChecker); //* Should be after 'notFound'
app.use(middlewares.checkBodyFields); //* Should be after 'requestMethodChecker'

//* All routers is in lifeLine =>

app.use(lifeLine);

module.exports = { app };
