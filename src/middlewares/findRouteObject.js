const { arrayOfRoutes } = require("@/routes");

const findRouteObject = (req, _res, next) => {
  req.routeObject = arrayOfRoutes.find((item) => {
    return item.fullUrl === req.url;
  });

  next();
};

module.exports = { findRouteObject };
