const { getErrorObject } = require("@/functions/utilities/utils");
const {
  appErrors: { NOT_FOUND },
} = require("@/variables/errors/appErrors");

const notFoundMiddleware = (_, res) => {
  res.checkAndResponse(NOT_FOUND, getErrorObject(NOT_FOUND));
};

module.exports = { notFoundMiddleware };
