const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { errorThrower } = require("@/utilities/utilities");

const { errors } = require("@/variables/errors");

const { arrayOfRoutes } = require("@/routes");

const tryToCheckRequestMethod = (reqUrl, reqMethod) => {
  const routeObject = arrayOfRoutes.find((value) => value.fullUrl === reqUrl);

  const requestMethod = reqMethod.toLowerCase();
  const routeObjectMethod = routeObject.method.toLowerCase();

  errorThrower(requestMethod !== routeObjectMethod, errors.METHOD_NOT_ALLOWED);

  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchCheckRequestMethod = (error, res) => {
  commonFunctionalities.controllerErrorResponse(error, res);
  return { ok: false };
};

const requestMethodChecker = (req, res, next) => {
  return trier(requestMethodChecker.name)
    .try(tryToCheckRequestMethod, req.url, req.method)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchCheckRequestMethod, res)
    .run();
};

module.exports = { requestMethodChecker };
