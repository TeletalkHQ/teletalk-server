const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

const {
  getStatusCodeFromRoute,
} = require("@/functions/utilities/getStatusCodeFromRouteObject");
const { getErrorObject } = require("@/functions/utilities/utils");

const {
  appErrors: { ROUTE_NOT_FOUND },
} = require("@/variables/errors/appErrors");

const notFoundMiddleware = (req, res, next) => {
  if (!customTypeof.check(req.routeObject).type.isObject) {
    const statusCode = getStatusCodeFromRoute(ROUTE_NOT_FOUND);
    const errorObject = getErrorObject(ROUTE_NOT_FOUND);

    res.status(statusCode).json(errorObject);
  } else {
    next();
  }
};

module.exports = { notFoundMiddleware };
