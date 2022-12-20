const sendJsonResponse = (req, res, data) => {
  const { routeObject } = req;
  res.status(routeObject.statusCode).json(data);
};

module.exports = { sendJsonResponse };
