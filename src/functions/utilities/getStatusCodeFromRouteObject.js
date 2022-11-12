const { trier } = require("utility-store/src/classes/Trier");

const { errorThrower } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors");

const tryGetStatusCodeFromRouteObject = (routeObject) => {
  const statusCode = routeObject?.statusCode;
  errorThrower(!statusCode, () => errors.NO_ROUTE_OBJECT);
  return statusCode;
};

const getStatusCodeFromRoute = (routeObject) => {
  return trier()
    .try(tryGetStatusCodeFromRouteObject, routeObject)
    .printAndThrow()
    .result();
};

module.exports = { getStatusCodeFromRoute };
