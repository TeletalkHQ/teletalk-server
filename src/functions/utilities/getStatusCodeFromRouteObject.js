const { errorThrower } = require("@/functions/utilities/utils");

const {
  appErrors: { NO_ROUTE_OBJECT },
} = require("@/variables/errors/appErrors");

const getStatusCodeFromRoute = (routeObject) => {
  try {
    const statusCode = routeObject?.statusCode;

    errorThrower(!statusCode, () => NO_ROUTE_OBJECT);

    return statusCode;
  } catch (error) {
    logger.log("getStatusCodeFromRoute catch, error:", error);
    errorThrower(error, error);
  }
};

module.exports = { getStatusCodeFromRoute };
