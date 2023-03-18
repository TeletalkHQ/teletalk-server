import { IoFields } from "check-fields";
import { Socket } from "socket.io-client";
import { objectUtilities } from "utility-store";

import { loggerHelper } from "@/helpers/logHelper";

import {
  NativeModelError,
  SocketResponse,
  SocketResponseErrors,
  SocketRoute,
  StringMap,
} from "@/types";

import { errors } from "@/variables/errors";

interface Options {
  shouldFilterRequestData: boolean;
}

class Requester {
  private error: NativeModelError;
  private options: Options = { shouldFilterRequestData: true };
  private requestData: StringMap;
  private response: SocketResponse;
  private route: SocketRoute;
  private socket: Socket;

  constructor(socket: Socket, route: SocketRoute) {
    this.setSocket(socket);
    this.setRoute(route);
  }

  getOptions() {
    return { ...this.options };
  }
  setOptions(newOptions: Partial<Options>) {
    this.options = this.mergeOptions(newOptions);
    return this;
  }
  mergeOptions(newOptions: Partial<Options>) {
    return {
      ...this.getOptions(),
      ...newOptions,
    };
  }

  getToken() {
    // return this.getOptions().token;
  }

  setSocket(socket: Socket) {
    this.socket = socket;
    return this;
  }

  getRoute() {
    return this.route;
  }
  setRoute(route: SocketRoute) {
    this.route = route;
    return this;
  }
  getInputFields() {
    return this.getRoute().inputFields;
  }

  getError() {
    return this.error;
  }
  setError(error: NativeModelError) {
    this.error = error;
    return this;
  }

  getRequestStatusCode() {
    return this.getError().statusCode || this.getRoute().statusCode;
  }

  getRequestData() {
    return this.requestData;
  }
  setRequestData(requestData: StringMap) {
    this.requestData = requestData;
    return this;
  }

  handleFilterRequestData(options = this.getOptions()) {
    const inputFields = this.convertInputField(this.getInputFields());
    const requestData = this.getRequestData();
    this.checkRequestDataFields(options, inputFields);
    return this.filterRequestData(requestData, inputFields);
  }
  convertInputField(inputFields: IoFields) {
    return Object.entries(inputFields).reduce((prevValue, currentValue) => {
      const [requiredFieldKey, requiredFieldProperties] = currentValue;
      prevValue[requiredFieldKey] = requiredFieldProperties.value;
      return prevValue;
    }, {} as StringMap);
  }
  checkRequestDataFields(options = this.getOptions(), inputFields: StringMap) {
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
  filterRequestData(requestData: StringMap, inputFields: StringMap) {
    return objectUtilities.excludePropsPeerToPeer(
      requestData,
      inputFields
    ) as StringMap;
  }

  async sendRequest() {
    const { name } = this.getRoute();
    const requestData = this.getRequestData();

    const request = new Promise((resolve, _reject) => {
      this.socket.emit(name, requestData, resolve);
    });

    const response = (await request) as SocketResponse;

    this.setResponse(response);

    return this;
  }

  async sendFullFeaturedRequest(
    data: StringMap,
    error: NativeModelError,
    options = this.getOptions()
  ) {
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

    await this.sendRequest();

    this.checkStatusCode().checkErrors();

    loggerHelper.logEndTestRequest();

    return this.getResponse();
  }

  getResponse() {
    return this.response;
  }
  getResponseStatusCode() {
    return this.getResponse().statusCode;
  }
  setResponse(response: SocketResponse) {
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
    const errors = this.getResponse().errors as SocketResponseErrors;
    expect(errors[key]?.reason).toBe(reason);
    return this;
  }
}

const requesterCreator = (socket: Socket, route: SocketRoute) =>
  new Requester(socket, route);

export { Requester, requesterCreator };
