const { getStatusCodeFromRoute } = require("~/functions/utilities/utilsNoDeps");

const sendJsonResponse = (_, res, next) => {
  try {
    res.sendJsonResponse = (routeObject, data) => {
      res.status(getStatusCodeFromRoute(routeObject)).json(data);
    };
  } catch (error) {
    logger.log("sendJsonResponse catch, error:", error);
    res.status(getStatusCodeFromRoute(error)).json(error);
  }

  next();
};

module.exports = { sendJsonResponse };
