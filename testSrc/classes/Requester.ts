import { IoFields } from "check-fields";
import { customTypeof } from "custom-typeof";
import { Socket as Client } from "socket.io-client";
import { objectUtils } from "utility-store";

import {
  IO,
  NativeError,
  SocketEvent,
  SocketResponse,
  StringMap,
} from "~/types";
import { errors } from "~/variables";

import { loggerHelper } from "@/helpers/logHelper";
import { RequesterOptions } from "@/types";

export class Requester<IOType extends IO> {
  private error?: NativeError;
  private options: RequesterOptions = {
    shouldFilterRequestData: true,
  };
  private requestData: IOType["input"];
  private response: SocketResponse<IOType["output"]>;
  private event: SocketEvent<IOType>;
  private socket: Client;

  constructor(socket: Client, event: SocketEvent<IOType>) {
    this.setSocket(socket);
    this.setEvent(event);
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

  getEvent() {
    return this.event;
  }

  getEventName() {
    return this.event.name;
  }
  setEvent(event: typeof this.event) {
    this.event = event;
    return this;
  }
  getInputFields() {
    return this.getEvent().inputFields;
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
  filterRequestData(requestData: IOType["input"], inputFields: StringMap) {
    return objectUtils.excludePropsPeerToPeer(
      requestData,
      inputFields
    ) as StringMap;
  }

  async sendRequest() {
    const { name } = this.getEvent();
    const requestData = this.getRequestData();

    const response = (await new Promise((resolve, _reject) => {
      this.socket.emit(name, requestData, resolve);
    })) as SocketResponse;

    this.setResponse(response);

    return this;
  }

  async sendFullFeaturedRequest(
    data: IOType["input"] = {},
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
      this.getEvent(),
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

export const requesterMaker = <IOType extends IO>(
  socket: Client,
  event: SocketEvent<IOType>
) => new Requester(socket, event);
