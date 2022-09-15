const { sendJsonResponse } = require("@/functions/helpers/sendJsonResponse");

const sendJsonResponseMiddleware = (req, res, next) => {
  res.sendJsonResponse = (data) => sendJsonResponse(req, res, data);
  next();
};

module.exports = { sendJsonResponseMiddleware };
