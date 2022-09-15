const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const {
  excludeVersions,
  errorThrower,
} = require("@/functions/utilities/utilities");

const {
  appErrors: { METHOD_NOT_ALLOWED },
} = require("@/variables/errors/appErrors");
const {
  allStuff: {
    routes: { version, ...routes },
  },
} = require("@/variables/others/allStuff");
const { trier } = require("utility-store/src/classes/Trier");

const routesWithoutVersion = excludeVersions(routes);

const tryToCheckRequestMethod = (reqUrl, reqMethod) => {
  const routeObject = Object.values(routesWithoutVersion).find(
    (value) => value.fullUrl === reqUrl
  );

  const requestMethod = reqMethod.toLowerCase();
  const routeObjectMethod = routeObject.method.toLowerCase();

  errorThrower(requestMethod !== routeObjectMethod, METHOD_NOT_ALLOWED);

  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchCheckRequestMethod = (error, res) => {
  commonFunctionalities.controllerCatchResponse(error, res);
  return { ok: false };
};

const requestMethodCheckerMiddleware = (req, res, next) => {
  return trier(requestMethodCheckerMiddleware.name)
    .try(tryToCheckRequestMethod, req.url, req.method)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchCheckRequestMethod, res)
    .result();
};

module.exports = { requestMethodCheckerMiddleware };
