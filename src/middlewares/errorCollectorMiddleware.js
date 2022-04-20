const { errorThrower } = require("~/functions/utilities/utilsNoDeps");

const errorCollectorMiddleware = ({ req, res, next, data }) => {
  try {
    errorThrower(
      !data,
      "Report to your back-end: Yo! you forgot to send me data - errorCollector"
    );

    const { statusCode, err, ex, error } = data;

    const er = err || ex || error;

    errorThrower(
      !er,
      "Report to your back-end, your backend should send error data to errorCollector"
    );

    if (typeof er === "object") {
      res.errors.categorizedErrorsLength =
        res.errors.categorizedErrors.push(er);
    } else {
      //? unhandled (non-object) error, write log into log files=>
      res.errors.uncategorizedErrorsLength =
        res.errors.uncategorizedErrors.push(er);
    }

    if ((statusCode || er.statusCode) && !isNaN(er.statusCode || +statusCode)) {
      res.errors.statusCode = er.statusCode || statusCode;
    }
  } catch (error) {
    logger
      .redBright("errorCollectorMiddleware catch! its critical!!!")
      .log(error);
    res.errors.serverErrorsLength = res.errors.server.push(error);
    res.errors.statusCode = 500;

    res.errorResponser();
  }
};

module.exports = { errorCollectorMiddleware };
