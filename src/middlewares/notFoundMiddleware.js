const {
  appErrors: { NOT_FOUND },
} = require("@/variables/errors/appErrors");

const notFoundMiddleware = (req, res) => {
  res.status(NOT_FOUND.statusCode).json(NOT_FOUND);
};

module.exports = { notFoundMiddleware };
