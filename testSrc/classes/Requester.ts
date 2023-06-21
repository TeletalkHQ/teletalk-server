import { IoFields } from "check-fields";
import { customTypeof } from "custom-typeof";
import { Socket as Client } from "socket.io-client";
import { objectUtilities } from "utility-store";

import { NativeError, SocketResponse, SocketRoute, StringMap } from "~/types";
import { errors } from "~/variables";

import { loggerHelper } from "@/helpers/logHelper";
import { RequesterOptions } from "@/types";

class Requester {
  private error?: NativeError;
  private options: RequesterOptions = {
    shouldFilterRequestData: true,
  };
  private requestData: StringMap;
  private response: SocketResponse;
  private route: SocketRoute;
  private socket: Client;

  constructor(socket: Client, route: SocketRoute) {
    this.setSocket(socket);
    this.setRoute(route);
  }

  getOptions() {
    return { ...this.options };
  }
  setOptions(newOptions: Partial<RequesterOptions>) {
    this.options = this.mergeOptions(newOptions);
    return this;
  }
  mergeOptions(newOptions: Partial<RequesterOptions>) {
    return {
      ...this.getOptions(),
      ...newOptions,
    };
  }

  getSocket() {
    return this.socket;
  }
  setSocket(socket: Client) {
    this.socket = socket;
    return this;
  }

  getRoute() {
    return this.route;
  }

  getEventName() {
    return this.route.name;
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
  setError(error: NativeError) {
    this.error = error;
    return this;
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
        ...errors.inputFieldsMissing,
        options,
        requestData: this.getRequestData(),
      };
      logger.dir("error", error, { depth: 10 });
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

    const response = (await new Promise((resolve, _reject) => {
      this.socket.emit(name, requestData, resolve);
    })) as SocketResponse;

    this.setResponse(response);

    return this;
  }

  async sendFullFeaturedRequest(
    data?: StringMap,
    error?: NativeError,
    options: Partial<RequesterOptions> = this.getOptions()
  ) {
    loggerHelper.logStartTestRequest();

    const finalOptions = this.mergeOptions(options);

    if (data) this.setRequestData(data);

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

    this.checkOk().checkErrors();

    loggerHelper.logEndTestRequest();

    return this.getResponse();
  }

  getResponse() {
    return this.response;
  }

  setResponse(response: SocketResponse) {
    this.response = response;
    return this;
  }

  checkOk() {
    const requestOk = this.getError() ? false : true;
    const responseOk = this.getResponse().ok;
    expect(responseOk).toEqual(requestOk);
    return this;
  }

  checkErrors() {
    const responseOk = this.getResponse().ok;
    if (responseOk !== true) this.checkErrorReason();

    return this;
  }
  checkErrorReason() {
    const expectedError = this.getError();
    if (!expectedError) throw "Error is not defined";

    const { reason: expectedReason } = expectedError;
    const { errors } = this.getResponse();
    expect(customTypeof.isArray(errors)).toBeTruthy();

    const err = errors?.find((i) => i.reason === expectedReason);
    expect(err?.reason).toEqual(expectedReason);

    return this;
  }
}

const requesterMaker = (socket: Client, route: SocketRoute) =>
  new Requester(socket, route);

export { Requester, requesterMaker };
