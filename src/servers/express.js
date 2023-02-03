const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

require("pretty-error").start();

const { loggerHelper } = require("@/utilities/logHelper");

const { middlewares } = require("@/middlewares");

const { lifeLine } = require("@/routers/lifeLine");

const { routes, ignoredUrlsForAuth } = require("@/routes");

const app = express();

app.use(middlewares.logSeparator);

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(serveFavicon("public/assets/icons/favicon/favicon.ico"));

//* Register response helpers =>
app.use(
  middlewares.responseErrorHandlers,
  middlewares.sendJsonResponse,
  middlewares.checkDataAndResponse,
  (req, _res, next) => {
    req.custom = {};
    next();
  }
);

//* Register route object checker =>
app.use(
  middlewares.findRoute,
  middlewares.notFound,
  middlewares.requestMethodChecker
);

app.use(loggerHelper.logRequestBody);

app.use(
  middlewares.ignoreMiddlewares(ignoredUrlsForAuth, middlewares.authDefault)
);

app.use(middlewares.checkBodyFields);

app.use(
  middlewares.ignoreMiddlewares(
    [
      ...ignoredUrlsForAuth,
      routes.auth.createNewUser.fullUrl,
      routes.auth.verify.fullUrl,
    ],
    middlewares.checkCurrentUserStatus,
    middlewares.attachCurrentUserId
  )
);

app.use(lifeLine);

app.use(middlewares.logSeparator);

module.exports = { expressServer: app };
