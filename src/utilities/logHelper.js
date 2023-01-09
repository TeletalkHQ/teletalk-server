const separator =
  "+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+";

const loggerHelper = {
  newLine() {
    return "\n";
  },
  makeSeparator(title = "") {
    const titleLength = title.length;
    const fixedSeparator = separator.slice(
      0,
      (separator.length - titleLength) / 2
    );

    return `${fixedSeparator}---${title}---${fixedSeparator}`;
  },
  logStartTestRequest() {
    logger
      .bgRed(
        `${this.newLine()}${this.makeSeparator("TEST_REQUEST_BEGIN")}`,
        logger.colors.black
      )
      .info();
    return this;
  },
  logRequestDetails(options, requestData, routeObject, errorObject) {
    logger.bgRed(`${this.newLine()}request details:`, logger.colors.black).dir(
      logger.levels.debug,
      {
        options,
        requestData,
        routeObject,
        errorObject,
      },
      { depth: 10 }
    );
    return this;
  },
  logEndTestRequest() {
    logger
      .bgYellow(
        `${this.newLine()}${this.makeSeparator("TEST_REQUEST_END")}`,
        logger.colors.black
      )
      .info();

    return this;
  },

  logRequestBody(req, _res, next) {
    logger
      .bgGreen(`${this.newLine()}body:`, logger.colors.black)
      .dir(req.body, { depth: 8 });
    next();
  },

  logSeparator() {
    logger.bgMagenta(this.makeSeparator(), logger.colors.black).info();
  },
};

loggerHelper.logRequestBody = loggerHelper.logRequestBody.bind(loggerHelper);
loggerHelper.newLine = loggerHelper.newLine.bind(loggerHelper);

module.exports = { loggerHelper };
