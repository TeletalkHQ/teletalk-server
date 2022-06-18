const { customTypeof } = require("@/classes/CustomTypeof");

const {
  getStatusCodeFromRoute,
} = require("@/functions/utilities/getStatusCodeFromRouteObject");
const { getErrorObject } = require("@/functions/utilities/utils");

const {
  appErrors: { NOT_FOUND },
} = require("@/variables/errors/appErrors");

const notFoundMiddleware = (req, res, next) => {
  if (!customTypeof.check(req.routeObject).type.object) {
    const statusCode = getStatusCodeFromRoute(NOT_FOUND);
    const errorObject = getErrorObject(NOT_FOUND);

    res.status(statusCode).json(errorObject);
  } else {
    next();
  }
};

module.exports = { notFoundMiddleware };
