const { arrayOfRoutes } = require("@/http/routes");

const findRoute = (req = expressRequest, _res, next) => {
  req.custom.route = arrayOfRoutes.find((item) => {
    return item.fullUrl === req.url;
  });

  next();
};

module.exports = { findRoute };
