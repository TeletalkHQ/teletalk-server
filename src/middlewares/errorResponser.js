const errorResponser = (req = expressRequest, res = expressResponse, next) => {
  try {
    const {
      categorizedErrors,
      categorizedErrorsLength,
      server,
      serverErrorsLength,
      statusCode: statusCodeFromErrorCollector,
      uncategorizedErrors,
      uncategorizedErrorsLength,
    } = res.errors;

    if (
      categorizedErrorsLength ||
      serverErrorsLength ||
      uncategorizedErrorsLength
    ) {
      const statusCode = statusCodeFromErrorCollector || 400;

      res.status(statusCode).json({
        errors: { categorizedErrors, uncategorizedErrors, server, statusCode },
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
