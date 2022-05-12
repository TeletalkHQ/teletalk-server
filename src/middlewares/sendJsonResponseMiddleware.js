const {
  getStatusCodeFromRoute,
} = require("@/functions/utilities/getStatusCodeFromRoute");

const sendJsonResponseMiddleware = (req, res, next) => {
  const { routeObject } = req;

  try {
    res.sendJsonResponse = (data) => {
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
