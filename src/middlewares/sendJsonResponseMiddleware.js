const {
  getStatusCodeFromRoute,
} = require("@/functions/utilities/getStatusCodeFromRouteObject");

const sendJsonResponseMiddleware = (req, res, next) => {
  try {
    res.sendJsonResponse = (data) => {
      const { routeObject } = req;
      const statusCode = getStatusCodeFromRoute(routeObject);

      res.status(statusCode).json(data);
    };
  } catch (error) {
    logger.log("sendJsonResponse catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }

  next();
};

module.exports = { sendJsonResponseMiddleware };
