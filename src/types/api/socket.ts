import { Event, Socket } from "socket.io";

import { NativeError, Route } from "..";

export type EventName =
  | "addBlock"
  | "addContact"
  | "addContactWithCellphone"
  | "addContactWithUserId"
  | "createNewUser"
  | "editContact"
  | "getChatInfo"
  | "getContacts"
  | "getCountries"
  | "getPrivateChat"
  | "getPrivateChats"
  | "getPublicUserData"
  | "getStuff"
  | "getUserData"
  | "getWelcomeMessage"
  | "joinRoom"
  | "logout"
  | "ping"
  | "removeBlock"
  | "removeContact"
  | "sendPrivateMessage"
  | "signIn"
  | "updatePublicUserData"
  | "verify";

export type IO = {
  input: object;
  output: object;
};

export type SocketResponseErrors = NativeError[];

export interface SocketResponse<Data = IO["output"]> {
  data: Data;
  errors: SocketResponseErrors;
  ok: boolean;
  eventName: EventName;
}

export type ResponseCallback<Data = IO["output"]> = (
  response: SocketResponse<Data>
) => Promise<Data>;

export type SocketMethods = "on" | "onAny" | "customOn" | "once";

export interface SocketHandlerReturnValue<IOType extends IO = any> {
  data: IOType["output"];
}

export type SocketOnHandler<IOType extends IO = any> = (
  socket: Socket,
  data: IOType["input"]
) =>
  | void
  | Promise<void>
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

// export type SocketRoutePicker<T extends EventName> = Pick<
//   SocketEventCollection,
//   Extract<EventName, T>
// >;

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
  ...any[]
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
