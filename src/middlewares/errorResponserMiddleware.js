const { crashServer } = require("@/functions/utilities/utils");

//TODO Update with getErrorObject and sendJsonResponse
const errorResponserMiddleware = (res = expressResponse) => {
  try {
    const { statusCode, ...errors } = res.errors;

    res.status(statusCode || 500).json({ errors, statusCode });
  } catch (error) {
    logger.redBright("BAD ERROR!!!").log();
    logger.log("errorResponserMiddleware catch ", error);
    crashServer();
  }
};

module.exports = { errorResponserMiddleware };
