import { escapeChars } from "@/variables";

const separator =
  "+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+";

const loggerHelper = {
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
        `${escapeChars.newLine}${this.makeSeparator("TEST_REQUEST_BEGIN")}`,
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
    logger.bgRed(`${escapeChars.newLine}request details:`, "black").dir(
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
        `${escapeChars.newLine}${this.makeSeparator("TEST_REQUEST_END")}`,
        "black"
      )
      .info();

    return this;
  },

  logSeparator() {
    logger.bgMagenta(this.makeSeparator(), "black").info();
  },
};

export { loggerHelper };
