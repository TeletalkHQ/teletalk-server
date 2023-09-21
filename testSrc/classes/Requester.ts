import chai from "chai";
import { IoFields } from "check-fields";
import { Socket as Client } from "socket.io-client";
import { IO } from "teletalk-type-store";
import { objectUtils } from "utility-store";

import { errorStore } from "~/classes/ErrorStore";
import {
	ErrorReason,
	NativeError,
	SocketEvent,
	SocketResponse,
	StringMap,
} from "~/types";

import { RequesterOptions } from "@/types";
import { loggerHelper } from "@/utils/logHelper";
import { FIELD_TYPE } from "@/variables";

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
		return this.getEvent().name;
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
	setError(reason: ErrorReason) {
		this.error = errorStore.find(reason);
		return this;
	}

	private getEmitData() {
		return this.requestData;
	}
	private setEmitData(requestData: StringMap) {
		this.requestData = requestData;
		return this;
	}

	private handleFilterRequestData(options = this.getOptions()) {
		const inputFields = this.convertInputField(this.getInputFields());
		const requestData = this.getEmitData();
		this.checkRequestDataFields(options, inputFields);
		return this.filterEmitData(requestData, inputFields);
	}
	private convertInputField(inputFields: IoFields) {
		return Object.entries(inputFields).reduce((prevValue, currentValue) => {
			const [requiredFieldKey, requiredFieldProperties] = currentValue;
			prevValue[requiredFieldKey] = requiredFieldProperties.value;
			return prevValue;
		}, {} as StringMap);
	}
	private checkRequestDataFields(
		options = this.getOptions(),
		inputFields: StringMap
	) {
		if (!this.getEmitData() && Object.keys(inputFields).length) {
			const error = {
				...errorStore.find("INPUT_FIELDS_MISSING"),
				options,
				requestData: this.getEmitData(),
			};
			logger.dir("error", error, { depth: 10 });
			loggerHelper.logEndTestRequest();
			throw error;
		}
	}
	private filterEmitData(requestData: IOType["input"], inputFields: StringMap) {
		return objectUtils.excludePropsPeerToPeer(
			requestData,
			inputFields
		) as StringMap;
	}

	async emit() {
		const response = (await new Promise((resolve, _reject) => {
			// this.socket.connect();
			this.socket.emit(this.getEventName(), this.getEmitData(), resolve);
		})) as SocketResponse;

		// this.socket.disconnect();
		this.setResponse(response);

		return this;
	}

	async emitFull(
		data: IOType["input"] = {},
		reason?: ErrorReason,
		options: Partial<RequesterOptions> = this.getOptions()
	) {
		loggerHelper.logStartTestRequest();

		const finalOptions = this.mergeOptions(options);

		if (data) this.setEmitData(data);

		if (options.shouldFilterRequestData) {
			const filteredRequestData = this.handleFilterRequestData(finalOptions);
			this.setEmitData(filteredRequestData);
		}

		loggerHelper.logRequestDetails(
			finalOptions,
			this.getEmitData(),
			this.getEvent(),
			this.getError()
		);

		if (reason) this.setError(reason);

		await this.emit();

		this.checkOk().checkErrors();

		loggerHelper.logEndTestRequest();

		return this.getResponse();
	}

	getResponse() {
		return this.response;
	}

	private setResponse(response: SocketResponse) {
		this.response = response;
		return this;
	}

	private checkOk() {
		const requestOk = this.getError() ? false : true;
		const responseOk = this.getResponse().ok;
		chai.expect(responseOk).to.be.equal(requestOk);
		return this;
	}

	private checkErrors() {
		const responseOk = this.getResponse().ok;
		if (responseOk !== true) this.checkErrorReason();

		return this;
	}
	private checkErrorReason() {
		const expectedError = this.getError();
		if (!expectedError) throw "Error is not defined";

		const { reason: expectedReason } = expectedError;
		const { errors } = this.getResponse();
		chai.expect(errors).to.be.an(FIELD_TYPE.ARRAY);

		const error = errors?.find((i) => i.reason === expectedReason);
		chai.expect(error?.reason).to.be.equal(expectedReason);

		return this;
	}
}

export const requesterMaker = <IOType extends IO>(
	socket: Client,
	event: SocketEvent<IOType>
) => new Requester(socket, event);
