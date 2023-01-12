const sendJsonResponse = (req, res, data) => {
  const {
    custom: { route },
  } = req;
  res.status(route.statusCode).json(data);
};

module.exports = { sendJsonResponse };
