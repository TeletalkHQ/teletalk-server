const { findRouteObject } = require("@/functions/utilities/findRouteObject");

const {
  appErrors: { ROUTE_NOT_FOUND },
} = require("@/variables/errors/appErrors");

const findRouteObjectMiddleware = (req, _res, next) => {
  req.routeObject = findRouteObject(req.url) || ROUTE_NOT_FOUND;
  next();
};

module.exports = { findRouteObject: findRouteObjectMiddleware };
