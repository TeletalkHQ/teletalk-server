const { findRouteObject } = require("@/functions/utilities/findRouteObject");

const { errors } = require("@/variables/errors/errors");

const findRouteObjectMiddleware = (req, _res, next) => {
  req.routeObject = findRouteObject(req.url) || errors.ROUTE_NOT_FOUND;
  next();
};

module.exports = { findRouteObject: findRouteObjectMiddleware };
