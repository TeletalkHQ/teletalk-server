const errorCollector = ({ req, res, next, data }) => {
  try {
    if (!data) {
      const error =
        "Report to your back-end: Yo! you forgot to send me data - errorCollector";
      throw error;
    }

    const { statusCode, err, ex, error } = data;

    const er = err || ex || error;

    if (!er) {
      const error =
        "Report to your back-end, your backend should send error data to errorCollector";
      throw error;
    }

    if (typeof er === "object") {
      res.errors.categorizedLength = res.errors.categorized.push(er);
    } else {
      //? unhandled (non-object) error, write log into log files=>
      res.errors.uncategorizedLength = res.errors.uncategorized.push(er);
    }

    if ((statusCode || er.statusCode) && !isNaN(er.statusCode || +statusCode)) {
      res.errors.statusCode = er.statusCode || statusCode;
    }
  } catch (error) {
    logger.redBright("errorCollector catch! its critical!!!").log(error);
    res.errors.serverLength = res.errors.server.push(error);
    res.errors.statusCode = 500;

    res.errorResponser();
  }
};

module.exports = { errorCollector };
