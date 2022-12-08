const {
  getStatusCodeFromRoute,
} = require("@/utilities/getStatusCodeFromRouteObject");

const sendJsonResponse = (req, res, data) => {
  const { routeObject } = req;
  const statusCode = getStatusCodeFromRoute(routeObject);
  res.status(statusCode).json(data);
};

module.exports = { sendJsonResponse };
