const { customTypeof } = require("@/classes/CustomTypeof");

const {
  appErrors: { UNKNOWN_ERROR },
} = require("@/variables/errors/appErrors");

const errorCollectorMiddleware = (res, errorObject) => {
  try {
    const errorToSend = !customTypeof.check(errorObject).type.object
      ? UNKNOWN_ERROR
      : errorObject;

    res.errors = errorToSend;

    if (customTypeof.check(+res.errors.statusCode).type.nan) {
      res.errors = errorToSend;
    }
  } catch (error) {
    logger
      .redBright("errorCollectorMiddleware catch! its critical!!!")
      .log(error);
    res.errors = UNKNOWN_ERROR;
    res.errorResponser();
  }
};

module.exports = { errorCollectorMiddleware };
