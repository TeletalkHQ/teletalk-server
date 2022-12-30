class RequesterLogger {
  #separator = "- - - - - - - - - - - - - - - - - - -";

  logStartRequest() {
    logger
      .bgRed(`\n${this.#separator}`, logger.colors.black)
      .bgRed("TEST_REQUEST_BEGIN", logger.colors.black)
      .bgRed(`${this.#separator}\n`, logger.colors.black)
      .info();
    return this;
  }
  logRouteSpecs(routeObject) {
    logger
      .bgBlue("route: ", logger.colors.black)
      .bgGreen(routeObject.fullUrl, logger.colors.black)
      .info();
    return this;
  }
  logOptions(options, inputFields) {
    logger.bgRed("options: ", logger.colors.black).info({
      ...options,
      inputFields,
    });
    return this;
  }
  logRequestData(requestData) {
    logger.info("requestData: ", requestData);
    return this;
  }
  logEndRequest() {
    logger
      .bgYellowBright(`\n${this.#separator}`, logger.colors.black)
      .bgYellowBright("TEST_REQUEST_END", logger.colors.black)
      .bgYellowBright(`${this.#separator}\n`, logger.colors.black)
      .info();

    return this;
  }

  logErrorStuffs(routeObject, errorObject) {
    const { fullUrl } = routeObject;
    const { errorKey, reason } = errorObject;

    logger.info(
      `route specs =>\n url:${fullUrl}\n reason:${reason}\n errorKey:${errorKey}\n`
    );
    return this;
  }
}

const requesterLogger = new RequesterLogger();

module.exports = {
  requesterLogger,
  RequesterLogger,
};
