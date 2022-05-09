const {
  appErrors: { NOT_FOUND },
} = require("@/variables/errors/appErrors");

const notFoundMiddleware = (_, res) => {
  res.sendJsonResponse(NOT_FOUND, NOT_FOUND);
};

module.exports = { notFoundMiddleware };
