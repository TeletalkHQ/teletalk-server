/* eslint-disable indent */
import { errorStore } from "~/classes/ErrorStore";
import { services } from "~/services";
import { ErrorReason, EventName } from "~/types";
import { events } from "~/websocket/events";
import { middlewares } from "~/websocket/middlewares";

type MiddlewareName = keyof typeof middlewares;
type ServiceName = keyof typeof services;

const eventNames = events.map((i) => i.name);
const middlewareNames = Object.keys(middlewares) as MiddlewareName[];
const serviceNames = Object.keys(services) as ServiceName[];

const createE2ESuccessDescribeMessage = (eventName: EventName) => {
	return `suite: [type:e2e] [status:success] [event:${eventName}]`;
};

const createUnitSuccessDescribeMessage = (eventName: EventName) => {
	return `suite: [type:unit] [status:success] [event:${eventName}]`;
};

const createE2ESuccessTestMessage = (
	eventName: EventName,
	description = "not provided"
) => {
	return `test: [type:e2e] [status:success] [event:${eventName}] [description:${description}]`;
};

const createUnitSuccessTestMessage = (
	name: EventName | MiddlewareName | ServiceName | `fn${string}`,
	description = "not provided"
) => {
	return `test: [type:unit] [status:success] [${getTargetPrefix(
		name
	)}:${name}] [description:${description}]`;
};

const createE2EFailDescribeMessage = (eventName: EventName) => {
	return `suite: [type:e2e] [status:failure] [event:${eventName}]`;
};

const createUnitFailDescribeMessage = (
	name: EventName | MiddlewareName | `fn${string}`
) => {
	return `suite: [type:unit] [status:failure] [${getTargetPrefix(
		name
	)}:${name.replace("fn", "")}]`;
};

const createE2EFailTestMessage = (name: EventName, reason: ErrorReason) => {
	const e = errorStore.find(reason);
	return `test: [type:e2e] [status:failure] [${getTargetPrefix(
		name
	)}:${name}] [side:${e.side}] [ expected error reason:${e.reason}]`;
};

const createUnitFailTestMessage = (
	name: EventName | ServiceName,
	reason: ErrorReason
) => {
	const e = errorStore.find(reason);
	return `test: [type:unit] [status:failure] [${getTargetPrefix(
		name
	)}:${name}] [side:${e.side}] [expected error reason:${e.reason}]`;
};

const getTargetPrefix = (name: string) =>
	eventNames.some((i) => i === name)
		? "event"
		: middlewareNames.some((i) => i === name)
		? "middleware"
		: serviceNames.some((i) => i === name)
		? "service"
		: "function";

export const createTestMessage = {
	e2eFailDescribe: createE2EFailDescribeMessage,
	e2eFailTest: createE2EFailTestMessage,
	e2eSuccessDescribe: createE2ESuccessDescribeMessage,
	e2eSuccessTest: createE2ESuccessTestMessage,
	unitFailDescribe: createUnitFailDescribeMessage,
	unitFailTest: createUnitFailTestMessage,
	unitSuccessDescribe: createUnitSuccessDescribeMessage,
	unitSuccessTest: createUnitSuccessTestMessage,
};
