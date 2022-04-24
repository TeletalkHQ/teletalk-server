const errorCollectorMiddleware = (res, errorObject) => {
  try {
    if (!errorObject || typeof errorObject !== "object") {
      //TODO Other errors
      errorObject = {
        errorCode: "UNKNOWN_ERROR_CODE",
        message: "Call your service",
        statusCode: 500,
        reason: "UNKNOWN_ERROR",
        unacceptableError: errorObject,
      };
    }

    res.errors = errorObject;

    logger.log("res.errors", res.errors);
    if (isNaN(+res.errors.statusCode)) {
      res.errors.statusCode = 500;
    }
  } catch (error) {
    logger
      .redBright("errorCollectorMiddleware catch! its critical!!!")
      .log(error);

    res.errors.statusCode = 500;

    res.errorResponser();
  }
};

module.exports = { errorCollectorMiddleware };
