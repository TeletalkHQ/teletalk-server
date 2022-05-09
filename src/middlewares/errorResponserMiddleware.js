const errorResponserMiddleware = (res = expressResponse) => {
  try {
    const { statusCode, ...errors } = res.errors;
    res.status(statusCode || 500).json({ errors, statusCode });
  } catch (error) {
    logger.redBright("BAD ERROR!!!").log();
    process.exit(1);
    logger.log("errorResponserMiddleware catch ", error);
  }
};

module.exports = { errorResponserMiddleware };
