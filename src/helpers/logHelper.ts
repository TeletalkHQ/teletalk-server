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
        "black"
      )
      .info();
    return this;
  },
  logRequestDetails(
    options: object,
    requestData: unknown,
    route: object,
    error: unknown
  ) {
    logger.bgRed(`${this.newLine()}request details:`, "black").dir(
      "debug",
      {
        options,
        requestData,
        route,
        error,
      },
      { depth: 10 }
    );
    return this;
  },
  logEndTestRequest() {
    logger
      .bgYellow(
        `${this.newLine()}${this.makeSeparator("TEST_REQUEST_END")}`,
        "black"
      )
      .info();

    return this;
  },

  // logRequestBody(req, _res, next) {
  //   logger
  //     .bgGreen(`${this.newLine()}body:`, "black")
  //     .dir(logger.levels.debug, req.body, { depth: 8 });
  //   next();
  // },

  logSeparator() {
    logger.bgMagenta(this.makeSeparator(), "black").info();
  },
};

loggerHelper.newLine = loggerHelper.newLine.bind(loggerHelper);

export { loggerHelper };
