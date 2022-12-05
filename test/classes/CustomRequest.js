const { trier } = require("utility-store/src/classes/Trier");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");
const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const supertest = require("supertest");

const { envManager } = require("@/classes/EnvironmentManager");

const { expect } = require("$/functions/utilities/testUtilities");
const { crashServer } = require("@/functions/utilities/utilities");

const getDevelopmentApp = () => require("@/app").app;
const getProductionApp = () => require("../../build").app;

const getServer = () => {
  const NODE_ENV = envManager.getNodeEnv();
  const {
    NODE_ENV: { test_development, test_production, test_production_local },
  } = envManager.ENVIRONMENT_VALUES;

  if (NODE_ENV === test_development) return getDevelopmentApp();
  if ([test_production, test_production_local].includes(NODE_ENV))
    return getProductionApp();

  const message = "No server found! check your environments...";
  crashServer(message);
};

const app = getServer();
const requester = supertest(app);

class CustomRequest {
  constructor(token) {
    this.routeObject = {};
    this.data = {};
    this.options = {
      filterDataCondition: true,
      token,
      inputFields: {},
    };
    this.temporaryOptions = { ...this.options };
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

    if (this.responseStatusCode !== requestStatusCode) {
      logger.error(
        `expected ${this.responseStatusCode} to equal ${requestStatusCode};\n response body is:`
      );
      logger.dir(this.response.body, { depth: 5 });
    }
    expect(this.responseStatusCode).to.equal(requestStatusCode);
    return this;
  }
  logErrorStuffs() {
    const { fullUrl } = this.routeObject;
    const { errorKey, reason } = this.errorObject;

    logger.info(
      `route specs => url:${fullUrl} reason:${reason} errorKey:${errorKey}\n response.body:`
    );
    logger.info("response body =>");
    logger.info(this.response.body);

    return this;
  }
  checkErrorReason() {
    const { errorKey, reason } = this.errorObject;
    expect(reason).to.equal(this.response.body.errors[errorKey]?.reason);
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
    this.temporaryOptions = {
      ...options,
      ...newOptions,
    };
    return this;
  }
  logSeparator() {
    return "- - - - - - - - - - - - - - - - - - -";
  }
  logStartTestRequest() {
    logger
      .bgRed(this.logSeparator(), logger.colors.black)
      .bgRed("TEST_REQUEST_BEGIN", logger.colors.black)
      .bgRed(this.logSeparator(), logger.colors.black)
      .info();
    return this;
  }
  logRouteSpecs() {
    logger
      .bgBlue("route: ", logger.colors.black)
      .bgGreen(this.routeObject.fullUrl, logger.colors.black)
      .info();
    return this;
  }
  logOptions() {
    logger.bgRed("temporary options: ", logger.colors.black).info({
      ...this.temporaryOptions,
      inputFields: this.routeObject.inputFields,
    });
    return this;
  }
  logRequestData() {
    logger.info("requestData: ", this.requestData);
    return this;
  }
  logEndRequest() {
    logger
      .bgYellowBright(this.logSeparator(), logger.colors.black)
      .bgYellowBright("TEST_REQUEST_END", logger.colors.black)
      .bgYellowBright(this.logSeparator(), logger.colors.black)
      .info();

    return this;
  }

  async sendFullFeaturedRequest(data, errorObject, options = this.options) {
    const tryToSendFullFeaturedRequest = async () => {
      (
        await this.mergeOptions(options)
          .logStartTestRequest()
          .logRouteSpecs()
          .logOptions()
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
    };

    return (
      await trier(this.sendFullFeaturedRequest.name).tryAsync(
        tryToSendFullFeaturedRequest
      )
    )
      .printAndThrow()
      .result();
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

    const response = await requester[method](fullUrl)
      .send(this.requestData)
      .set("Content-Type", "application/json")
      .set(...this.authorizationHeader);

    this.setResponse(response);
    return this;
  }

  makeAuthorizationHeader() {
    const { token } = this.temporaryOptions;
    this.authorizationHeader = [
      "Authorization",
      customTypeof.isTruthy(token) ? `Bearer ${token}` : null,
    ];

    return this;
  }

  filterRequestData() {
    const convertRequiredFieldForFiltering = objectUtilities
      .objectEntries(this.routeObject.inputFields)
      .reduce((previousValue, currentValue) => {
        const [requiredFieldKey, requiredFieldProperties] = currentValue;
        previousValue[requiredFieldKey] =
          requiredFieldProperties.value || requiredFieldKey;
        return previousValue;
      }, {});

    //FIXME: Throw error if inputData is undefined when inputFields is not
    const filteredRequestData = objectUtilities.excludePropsPeerToPeer(
      this.requestData,
      convertRequiredFieldForFiltering
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

const customRequestCreator = (token) => {
  return {
    create: () => new CustomRequest(token),
  };
};

module.exports = {
  customRequestCreator,
  CustomRequest,
};
