const { trier } = require("utility-store/src/classes/Trier");
const { errorThrower } = require("utility-store/src/functions/utilities");

const { commonUtilities } = require("@/classes/CommonUtilities");

const { errors } = require("@/variables/errors");

const { arrayOfRoutes } = require("@/routes");

const requestMethodChecker = (req, res, next) => {
  return trier(requestMethodChecker.name)
    .try(tryToCheckRequestMethod, req)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchCheckRequestMethod, res)
    .run();
};

const tryToCheckRequestMethod = (req) => {
  const routeObject = arrayOfRoutes.find((value) => value.fullUrl === req.url);

  const requestMethod = req.method.toLowerCase();
  const routeObjectMethod = routeObject.method.toLowerCase();

  errorThrower(requestMethod !== routeObjectMethod, errors.METHOD_NOT_ALLOWED);

  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchCheckRequestMethod = (error, res) => {
  commonUtilities.controllerErrorResponse(error, res);
  return { ok: false };
};

module.exports = { requestMethodChecker };
