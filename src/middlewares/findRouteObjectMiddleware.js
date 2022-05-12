const { findRouteObject } = require("@/functions/utilities/findRouteObject");

const findRouteObjectMiddleware = (req, res, next) => {
  req.routeObject = findRouteObject(req.url);

  next();
};

module.exports = { findRouteObjectMiddleware };
