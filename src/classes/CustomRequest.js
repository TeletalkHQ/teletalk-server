const supertest = require("supertest")(require("@/app").app);
const { expect } = require("chai");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");
const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

class CustomRequest {
  constructor(token) {
    this.routeObject = {};
    this.data = {};
    this.options = {
      token,
      filterDataCondition: true,
      requiredFieldIndex: 0,
      selectedRequiredFields: {},
    };
    this.mergedOptions = { ...this.options };
    this.requestData = undefined;
    this.errorObject = undefined;
    this.authorizationHeader = ["Authorization", null];
    this.responseStatusCode = undefined;
  }

  setRouteObject(routeObject) {
    this.routeObject = routeObject;
    return this;
  }

  setRequestRequirements(routeObject, options = this.options) {
    this.setRouteObject(routeObject);
    this.setOptions(options);
    return this;
  }
  setErrorObject(errorObject) {
    this.errorObject = errorObject;
    return this;
  }
  checkStatusCode() {
    const requestStatusCode =
      this.errorObject?.statusCode || this.routeObject?.statusCode;
    expect(requestStatusCode).to.equal(this.responseStatusCode);
    return this;
  }
  logErrorStuffs() {
    const { fullUrl } = this.routeObject;
    const { errorKey, reason } = this.errorObject;

    logger.log(
      `route specs => url:${fullUrl} reason:${reason} errorKey:${errorKey}\n response.body:`
    );
    logger.log(`response body =>`);
    logger.log(this.response.body);

    return this;
  }
  checkErrorReason() {
    const { errorKey, reason } = this.errorObject;
    expect(this.response.body.errors[errorKey]?.reason).to.equal(reason);
    return this;
  }
  checkErrorCode() {
    const { errorKey, errorCode } = this.errorObject;
    expect(this.response.body.errors[errorKey]?.errorCode).to.equal(errorCode);
    return this;
  }
  checkError() {
    if (this.responseStatusCode > 299) {
      this.logErrorStuffs().checkErrorReason().checkErrorCode();
    }
    return this;
  }

  mergeOptions(newOptions = this.getOptions) {
    const options = this.getOptions();
    this.mergedOptions = {
      ...options,
      ...newOptions,
    };
    return this;
  }
  logStartTestRequest() {
    logger
      .bgRed("- - - - - - - - - - - - - - - - - - -", logger.colors.black)
      .bgRed("TEST_REQUEST_BEGIN", logger.colors.black)
      .bgRed(" - - - - - - - - - - - - - - - - - - - ", logger.colors.black)
      .log();
    return this;
  }
  logRouteSpecs() {
    logger
      .bgBlue(`route: `, logger.colors.black)
      .bgGreen(this.routeObject.fullUrl, logger.colors.black)
      .log();
    return this;
  }
  logMergedOptions() {
    logger
      .bgRed("mergedOptions: ", logger.colors.black)
      .log(this.mergedOptions);
    return this;
  }
  logRequestData() {
    logger.log("requestData: ", this.requestData);
    return this;
  }
  logEndRequest() {
    logger
      .bgYellowBright(
        "- - - - - - - - - - - - - - - - - - -",
        logger.colors.black
      )
      .bgYellowBright("TEST_REQUEST_END", logger.colors.black)
      .bgYellowBright(
        " - - - - - - - - - - - - - - - - - - - ",
        logger.colors.black
      )
      .log();

    return this;
  }
  setSelectedRequiredFields() {
    const selectedRequiredFields = this.getSelectedRequiredFields();
    this.setOptions({ selectedRequiredFields });
    return this;
  }
  async sendFullFeaturedRequest(data, errorObject, options = this.options) {
    (
      await this.mergeOptions(options)
        .logStartTestRequest()
        .logRouteSpecs()
        .setSelectedRequiredFields()
        .logMergedOptions()
        .setRequestData(data)
        .filterRequestData()
        .logRequestData()
        .setErrorObject(errorObject)
        .makeAuthorizationHeader()
        .sendRequest()
    )
      .setResponseStatusCode()
      .checkStatusCode()
      .checkError()
      .logEndRequest();

    return this.response;
  }

  getToken() {
    return this.getOptions().token;
  }
  setToken(token) {
    this.setOptions({ token });
    return this;
  }

  getOptions() {
    return this.options;
  }
  setOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };

    return this;
  }
  setResponseStatusCode() {
    const { statusCode: responseStatusCode } = this.response;
    const responseBodyStatusCode = this.response.body?.statusCode;

    this.responseStatusCode = responseStatusCode || responseBodyStatusCode;
    return this;
  }

  async sendRequest() {
    const { method, fullUrl } = this.routeObject;

    const response = await supertest[method](fullUrl)
      .send(this.requestData)
      .set("Content-Type", "application/json")
      .set(...this.authorizationHeader);

    this.setResponse(response);
    return this;
  }

  makeAuthorizationHeader() {
    const { token } = this.mergedOptions;
    this.authorizationHeader = [
      "Authorization",
      //TODO: Add test for Bearer missing
      customTypeof.check(token).isTruthy ? `Bearer ${token}` : null,
    ];

    return this;
  }

  getSelectedRequiredFields() {
    const { requiredFieldIndex } = this.mergedOptions;
    return this.routeObject.inputFields[requiredFieldIndex];
  }
  filterRequestData() {
    const { selectedRequiredFields } = this.getOptions();
    const filteredRequestData = objectUtilities.excludePropsPeerToPeer(
      this.requestData,
      selectedRequiredFields
    );
    this.setRequestData(filteredRequestData);
    return this;
  }
  setRequestData(requestData) {
    this.requestData = requestData;
    return this;
  }

  setResponse(response) {
    this.response = response;
    return this;
  }
}

const customRequest = (token) => {
  return { create: () => new CustomRequest(token) };
};

module.exports = {
  customRequest,
  CustomRequest,
};
