const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");
const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const {
  excludeVersions,
  errorThrower,
} = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors/errors");
const { allStuff } = require("@/variables/others/allStuff");

const routesWithoutVersion = excludeVersions(allStuff.routes);

const tryToCheckRequestMethod = (reqUrl, reqMethod) => {
  const routeObject = objectUtilities
    .objectValues(routesWithoutVersion)
    .find((value) => value.fullUrl === reqUrl);

  const requestMethod = reqMethod.toLowerCase();
  const routeObjectMethod = routeObject.method.toLowerCase();

  errorThrower(requestMethod !== routeObjectMethod, errors.METHOD_NOT_ALLOWED);

  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchCheckRequestMethod = (error, res) => {
  commonFunctionalities.controllerCatchResponse(error, res);
  return { ok: false };
};

const requestMethodChecker = (req, res, next) => {
  return trier(requestMethodChecker.name)
    .try(tryToCheckRequestMethod, req.url, req.method)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchCheckRequestMethod, res)
    .result();
};

module.exports = { requestMethodChecker };
