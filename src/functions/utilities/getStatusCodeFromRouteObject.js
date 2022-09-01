const { trier } = require("utility-store/src/classes/Trier");

const { errorThrower } = require("@/functions/utilities/utils");

const {
  appErrors: { NO_ROUTE_OBJECT },
} = require("@/variables/errors/appErrors");

const tryGetStatusCodeFromRouteObject = (routeObject) => {
  const statusCode = routeObject?.statusCode;
  errorThrower(!statusCode, () => NO_ROUTE_OBJECT);
  return statusCode;
};

const getStatusCodeFromRoute = (routeObject) => {
  return trier()
    .try(tryGetStatusCodeFromRouteObject, routeObject)
    .printAndThrow().result;
};

module.exports = { getStatusCodeFromRoute };
