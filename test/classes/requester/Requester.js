const { expect } = require("chai");
const supertest = require("supertest");
const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { errorThrower } = require("utility-store/src/functions/utilities");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

const { requesterLogger } = require("$/classes/requester/RequesterLogger");

const { getApp } = require("$/utilities/testUtilities");

const { errors } = require("@/variables/errors");

const requester = supertest(getApp());

class Requester {
  #requestData = undefined;
  #routeObject = {};
  #errorObject = {};
  response = {};
  #options = {
    shouldFilterRequestData: true,
    token: undefined,
  };

  constructor(token, routeObject) {
    this.setToken(token);
    this.setRouteObject(routeObject);
  }

  getOptions() {
    return this.#options;
  }
  setOptions(newOptions) {
    this.#options = this.mergeOptions(newOptions);
    return this;
  }
  mergeOptions(newOptions) {
    return {
      ...this.getOptions(),
      ...newOptions,
    };
  }

  getToken() {
    return this.getOptions().token;
  }
  setToken(token) {
    this.setOptions({ token });
    return this;
  }

  getRouteObject() {
    return this.#routeObject;
  }
  setRouteObject(routeObject) {
    this.#routeObject = routeObject;
    return this;
  }
  getInputFields() {
    return this.getRouteObject().inputFields;
  }
  convertInputField(inputFields) {
    return Object.entries(inputFields).reduce((prevValue, currentValue) => {
      const [requiredFieldKey, requiredFieldProperties] = currentValue;
      prevValue[requiredFieldKey] = requiredFieldProperties.value;
      return prevValue;
    }, {});
  }

  getErrorObject() {
    return this.#errorObject;
  }
  setErrorObject(errorObject = {}) {
    this.#errorObject = errorObject;
    return this;
  }

  getRequestStatusCode() {
    return this.getErrorObject().statusCode || this.getRouteObject().statusCode;
  }

  getRequestData() {
    return this.#requestData;
  }
  setRequestData(requestData) {
    this.#requestData = requestData;
    return this;
  }

  handleRequestDataFields(options = this.getOptions()) {
    if (options.shouldFilterRequestData) {
      const inputFields = this.convertInputField(this.getInputFields());
      this.checkRequestDataFields(options, inputFields);
      this.filterRequestData(inputFields);
    }
  }
  checkRequestDataFields(options = this.getOptions(), inputFields) {
    errorThrower(!this.getRequestData() && Object.keys(inputFields).length, {
      ...errors.INPUT_FIELDS_MISSING,
      options,
    });
  }
  filterRequestData(inputFields) {
    const requestData = this.getRequestData();
    const filteredRequestData = objectUtilities.excludePropsPeerToPeer(
      requestData,
      inputFields
    );
    this.setRequestData(filteredRequestData);
    return this;
  }

  fixToken(token) {
    return customTypeof.isTruthy(token) ? `Bearer ${token}` : null;
  }

  async sendRequest(options = this.getOptions()) {
    const { method, fullUrl } = this.getRouteObject();
    const requestData = this.getRequestData();

    const token = this.fixToken(options.token);

    const response = await requester[method](fullUrl)
      .send(requestData)
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    this.setResponse(response);

    return this;
  }
  async sendFullFeaturedRequest(
    data,
    errorObject,
    options = this.getOptions()
  ) {
    const finalOptions = this.mergeOptions(options);

    requesterLogger
      .logStartRequest()
      .logRouteSpecs(this.getRouteObject())
      .logOptions(finalOptions, this.getInputFields());

    this.setRequestData(data).handleRequestDataFields(finalOptions);

    requesterLogger.logRequestData(this.getRequestData());

    this.setErrorObject(errorObject);

    await this.sendRequest(finalOptions);

    this.checkStatusCode().checkErrors();

    requesterLogger.logEndRequest();

    return this.getResponse();
  }

  getResponse() {
    return this.response;
  }
  getResponseBody() {
    return this.getResponse().body;
  }
  getResponseStatusCode() {
    const response = this.getResponse();
    return response.statusCode || response.body.statusCode;
  }
  setResponse(response) {
    this.response = response;
    return this;
  }

  checkStatusCode() {
    const requestStatusCode = this.getRequestStatusCode();
    const responseStatusCode = this.getResponseStatusCode();
    expect(responseStatusCode).to.be.equal(requestStatusCode);
    return this;
  }

  checkErrors() {
    const statusCode = this.getResponseStatusCode();
    if (statusCode >= 400) {
      requesterLogger.logErrorStuffs(
        this.getRouteObject(),
        this.getErrorObject()
      );
      this.checkErrorReason();
    }
    return this;
  }
  checkErrorReason() {
    const { errorKey, reason } = this.getErrorObject();
    const { errors } = this.getResponseBody();
    expect(errors[errorKey]?.reason).to.equal(reason);
    return this;
  }
}

const requesterCreator = (token) => {
  return {
    create: (routeObject) => new Requester(token, routeObject),
  };
};

module.exports = {
  Requester,
  requesterCreator,
};
