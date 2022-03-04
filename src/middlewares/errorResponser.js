const errorResponser = (req = expressRequest, res = expressResponse, next) => {
  try {
    const {
      categorized,
      categorizedLength,
      server,
      serverLength,
      statusCode: statusCodeFromErrorCollector,
      uncategorized,
      uncategorizedLength,
    } = res.errors;

    if (categorizedLength || serverLength || uncategorizedLength) {
      const statusCode = statusCodeFromErrorCollector || 400;

      res.status(statusCode).json({
        errors: { categorized, uncategorized, server, statusCode },
      });
    } else {
      next();
    }
  } catch (error) {
    logger.redBright("BAD ERROR!!!").log();
    logger.log("errorResponser catch ", error);
  }
};

module.exports = { errorResponser };
