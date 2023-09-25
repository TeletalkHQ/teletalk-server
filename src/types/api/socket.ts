import { Event, Socket } from "socket.io";
import { EventName, IO } from "teletalk-type-store";

import { NativeError, Route, VoidNoArgsFn } from "..";

export type SocketResponseErrors = NativeError[];

export interface SocketResponse<Data = IO["output"]> {
	data: Data;
	errors: SocketResponseErrors;
	ok: boolean;
	eventName: EventName;
}

export type ResponseCallback<Data = IO["output"]> = (
	response: SocketResponse<Data>
) => void | Promise<void>;

export type SocketMethods = "on" | "onAny" | "customOn" | "once";

export interface SocketOnHandlerReturnOptions {
	shouldEmitReturnValue: boolean;
	shouldCallResponseCallback: boolean;
	shouldEmitToUserRooms: boolean;
	cbAfterEmit: VoidNoArgsFn;
}

export interface SocketHandlerReturnValue<IOType extends IO = any> {
	data: IOType["output"];
	options?: Partial<SocketOnHandlerReturnOptions>;
}

export type SocketOnHandler<IOType extends IO = any> = (
	socket: Socket,
	data: IOType["input"]
) =>
	| SocketHandlerReturnValue<IOType>
	| Promise<SocketHandlerReturnValue<IOType>>;

export type SocketOnAnyHandler<IOType extends IO = any> = (
	socket: Socket,
	data: IOType["input"],
	eventName: EventName
) =>
	| void
	| Promise<void>
	| SocketHandlerReturnValue<IOType>
	| Promise<SocketHandlerReturnValue<IOType>>;

export interface SocketEvent<IOType extends IO = any> extends Route {
	name: EventName;
	handler: SocketOnHandler<IOType>;
	method: SocketMethods;
}

export type CustomEmit = (eventName: EventName, data: SocketResponse) => void;

export type CustomOn = (
	eventName: EventName,
	callback: SocketOnHandler<any>
) => void;

export type SocketNext = (error?: Error | undefined) => void;

export type SocketMiddlewareEvent<IOType extends IO = any> = [
	EventName,
	IOType["input"],
	ResponseCallback,
	...any[],
];

export type SocketMiddlewareReturnValue = {
	ok: boolean;
};

export type SocketDefaultMiddlewareEvent = Event;

export type SocketMiddleware<IOType extends IO = any> = (
	socket: Socket,
	next: SocketNext,
	socketMiddlewareEvent: SocketMiddlewareEvent<IOType>
) =>
	| void
	| SocketMiddlewareReturnValue
	| Promise<void>
	| Promise<SocketMiddlewareReturnValue>;

export type CustomUse = (middleware: SocketMiddleware) => void;
