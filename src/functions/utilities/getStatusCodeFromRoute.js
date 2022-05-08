const {
  errorThrower,
  getErrorObject,
} = require("@/functions/utilities/utilsNoDeps");

const {
  appErrors: {
    properties: {
      NO_ROUTE_OBJECT: { properties: NO_ROUTE_OBJECT },
    },
  },
} = require("@/variables/errors/appErrors");

const getStatusCodeFromRoute = (routeObject) => {
  try {
    const statusCode = routeObject?.statusCode;

    errorThrower(!statusCode, () => getErrorObject(NO_ROUTE_OBJECT));

    return statusCode;
  } catch (error) {
    logger.log("getStatusCodeFromRoute catch, error:", error);
    throw error;
  }
};

module.exports = { getStatusCodeFromRoute };
