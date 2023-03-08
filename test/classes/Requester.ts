import supertest from "supertest";
import { objectUtilities } from "utility-store";

import { loggerHelper } from "@/helpers/logHelper";

import { expressServer } from "@/servers/express";

import { errors } from "@/variables/errors";
import { authManager } from "@/classes/AuthManager";

const requester = supertest(expressServer);

class Requester {
  #requestData;
  route = {};
  error = {};
  response = {};
  #options = {
    shouldFilterRequestData: false,
    token: undefined,
  };

  constructor(token, route) {
    this.setToken(token);
    this.setRoute(route);
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

  getRoute() {
    return this.route;
  }
  setRoute(route) {
    this.route = route;
    return this;
  }
  getInputFields() {
    return this.getRoute().inputFields;
  }

  getError() {
    return this.error;
  }
  setError(error = {}) {
    this.error = error;
    return this;
  }

  getRequestStatusCode() {
    return this.getError().statusCode || this.getRoute().statusCode;
  }

  getRequestData() {
    return this.#requestData;
  }
  setRequestData(requestData) {
    this.#requestData = requestData;
    return this;
  }

  handleFilterRequestData(options = this.getOptions()) {
    const inputFields = this.convertInputField(this.getInputFields());
    const requestData = this.getRequestData();
    this.checkRequestDataFields(options, inputFields);
    return this.filterRequestData(requestData, inputFields);
  }
  convertInputField(inputFields) {
    return Object.entries(inputFields).reduce((prevValue, currentValue) => {
      const [requiredFieldKey, requiredFieldProperties] = currentValue;
      prevValue[requiredFieldKey] = requiredFieldProperties.value;
      return prevValue;
    }, {});
  }
  checkRequestDataFields(options = this.getOptions(), inputFields) {
    if (!this.getRequestData() && Object.keys(inputFields).length) {
      const error = {
        ...errors.INPUT_FIELDS_MISSING,
        options,
        requestData: this.getRequestData(),
      };
      logger.dir(logger.levels.error, error, { depth: 10 });
      loggerHelper.logEndTestRequest();
      throw error;
    }
  }
  filterRequestData(requestData, inputFields) {
    return objectUtilities.excludePropsPeerToPeer(requestData, inputFields);
  }

  async sendRequest(options = this.getOptions()) {
    const { method, fullUrl } = this.getRoute();
    const requestData = this.getRequestData();

    const agent = requester[method](fullUrl);
    agent.set("Content-Type", "application/json");

    if (options.token)
      agent.set("Cookie", [
        `${authManager.getOptions().cookie.SESSION_NAME}=${options.token}`,
      ]);

    const response = await agent.send(requestData);

    this.setResponse(response);

    return this;
  }

  async sendFullFeaturedRequest(data, error, options = this.getOptions()) {
    loggerHelper.logStartTestRequest();

    const finalOptions = this.mergeOptions(options);

    this.setRequestData(data);

    if (options.shouldFilterRequestData) {
      const filteredRequestData = this.handleFilterRequestData(finalOptions);
      this.setRequestData(filteredRequestData);
    }

    loggerHelper.logRequestDetails(
      finalOptions,
      this.getRequestData(),
      this.getRoute(),
      this.getError()
    );

    if (error) this.setError(error);

    await this.sendRequest(finalOptions);

    this.checkStatusCode().checkErrors();

    loggerHelper.logEndTestRequest();

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
    expect(responseStatusCode).toBe(requestStatusCode);
    return this;
  }

  checkErrors() {
    const statusCode = this.getResponseStatusCode();
    if (statusCode >= 400) {
      this.checkErrorReason();
    }
    return this;
  }
  checkErrorReason() {
    const { key, reason } = this.getError();
    const { errors } = this.getResponseBody();
    expect(errors[key]?.reason).toBe(reason);
    return this;
  }
}

const requesterCreator = (token) => {
  return {
    create: (route) => new Requester(token, route),
  };
};

export { Requester, requesterCreator };
