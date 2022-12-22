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
const { routes } = require("@/routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(middlewares.requestDetailsLogger);
app.use(morgan("dev"));

app.use(express.static("public"));
app.use(serveFavicon("public/assets/icons/favicon/favicon.ico"));

//* Register response helpers =>
app.use(
  middlewares.responseErrorHandlers,
  middlewares.sendJsonResponse,
  middlewares.checkDataAndResponse
);

//* Register route object checker =>
app.use(
  middlewares.findRouteObject,
  middlewares.notFound,
  middlewares.requestMethodChecker
);

app.use(
  middlewares.ignoreMiddlewaresByUrl(
    getIgnoredUrlsForAuth(),
    middlewares.authDefault
  )
);

app.use(middlewares.checkBodyFields);

app.use(
  middlewares.ignoreMiddlewaresByUrl(
    [
      ...getIgnoredUrlsForAuth(),
      routes.user.createNewUser.fullUrl,
      routes.user.verify.fullUrl,
    ],
    middlewares.checkCurrentUserStatus,
    middlewares.attachCurrentUserId
  )
);

//* All routers is in lifeLine =>
app.use(lifeLine);

module.exports = { app };
