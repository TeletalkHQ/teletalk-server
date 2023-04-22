/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import { IoFields } from "check-fields";
import { ValidationError, ValidationRuleObject } from "fastest-validator";
import {
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  ProjectionType,
  QueryOptions,
  Types,
} from "mongoose";
import { Event, Socket as ServerSocket } from "socket.io";
import { Socket as ClientSocket } from "socket.io-client";
import { ContactWithCellphone } from "utility-store/lib/types";

export interface Cellphone {
  countryCode: string;
  countryName: string;
  phoneNumber: string;
}

export type Validator = (param: any) => Promise<void>;

export type Field =
  | "bio"
  | "chatId"
  | "countryCode"
  | "countryName"
  | "firstName"
  | "lastName"
  | "messageText"
  | "participantId"
  | "phoneNumber"
  | "session"
  | "userId"
  | "username"
  | "verificationCode";

export interface ValidationModel {
  [prop: string]: ValidationRuleObject;
}

export type FieldType =
  | "array"
  | "boolean"
  | "date"
  | "number"
  | "object"
  | "string";

export type CustomEmit = (event: string, data: StringMap) => void;

export type CustomOn = (event: string, callback: SocketOnHandler) => void;

export type SocketNext = (err?: Error | undefined) => void;

export type SocketEvent = Event;

export type SocketMiddlewareReturnValue = {
  ok: boolean;
};

export type SocketMiddleware = (
  socket: ServerSocket,
  next: SocketNext,
  event: SocketEvent
) =>
  | void
  | SocketMiddlewareReturnValue
  | Promise<void>
  | Promise<SocketMiddlewareReturnValue>;

export type CustomUse = (middleware: SocketMiddleware) => void;

export interface FullName {
  firstName: string;
  lastName: string;
}

export interface Contact extends FullName {
  userId: string;
}

export type SocketMiddlewareEvent = string | string[];

export type CreatedAt = number;

export interface Environments {
  LOG_LEVEL: LogLevel;
  MONGO_COLLECTION_NAME: string;
  MONGO_PORT: number;
  MONGO_URL: string;
  NODE_ENV: NodeEnvValue;
  PORT: number;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  SELF_EXEC: boolean;
  SESSION_MAIN_SECRET: string;
  SESSION_SIGN_IN_SECRET: string;
  SMS_PROVIDER_1_HOST: string;
  SMS_PROVIDER_1_ROUTE: string;
  SMS_PROVIDER_1_SENDER: string;
  SMS_PROVIDER_1_SESSION: string;
  SMS_PROVIDER_2_HOST: string;
  SMS_PROVIDER_2_REPORT_URL: string;
  SMS_PROVIDER_2_ROUTE: string;
  SMS_PROVIDER_2_SESSION: string;
  SMS_PROVIDER_SELECTOR: number;
}

export type HydratedPrivateChatMongo = HydratedDocument<PrivateChatMongo>;
export type HydratedUserMongo = HydratedDocument<UserMongo>;

export interface NativeError {
  description?: string;
  isAuthError: boolean;
  key: string;
  message?: string;
  reason: string;
  side: "server" | "client";
}

export interface NativeModelItem {
  error: NativeError;
  value: any;
}
export interface NativeModel {
  defaultValue: {
    value: any;
    error: NativeError;
  };
  empty: {
    value: boolean;
    error: NativeError;
  };
  items: {
    value: any[];
    error: NativeError;
  };
  length: {
    value: number;
    error: NativeError;
  };
  maxlength: {
    value: number;
    error: NativeError;
  };
  minlength: {
    value: number;
    error: NativeError;
  };
  numeric: {
    value: boolean;
    error: NativeError;
  };
  required: {
    value: boolean;
    error: NativeError;
  };
  trim: { value: boolean; error?: NativeError };
  type: {
    value: FieldType;
    error: NativeError;
  };
  unique: {
    value: boolean;
    error: NativeError;
  };
}
// export interface MongoModel {
//   default: [unknown, IError];
//   empty: [boolean, IError];
//   items: [];
//   lowercase: [];
//   maxlength: [];
//   minlength: [];
//   required: [];
//   trim: [];
//   type: [];
//   unique: [];
// }

export interface Sender {
  senderId: string;
}
export interface Message {
  createdAt: CreatedAt;
  messageText: string;
  messageId: string;
  sender: Sender;
}

export interface Participant {
  participantId: string;
}
export interface PrivateChatMongo {
  chatId: string;
  createdAt: CreatedAt;
  messages: Types.Array<Message>;
  participants: Types.Array<Participant>;
}
export interface Route {
  inputFields: IoFields | Record<string, never>;
  outputFields: IoFields | Record<string, never>;
  isAuthRequired: boolean;
}

export interface SocketHandlerReturnValue {
  data: StringMap;
}

export type ClientCallback = (data: SocketResponse) => void;

export type SocketMethods = "on" | "onAny" | "customOn" | "once";

export interface SocketRoute extends Route {
  name: EventName;
  handler: SocketOnHandler;
  method: SocketMethods;
}

export type SocketRouteCollection = {
  [prop in EventName]: SocketRoute;
};

export interface Session {
  session: string;
}

export interface Status {
  isActive: boolean;
}

export interface StringMap {
  [key: string]: any;
}

export interface BlackListItem {
  userId: string;
}

export interface UserMongo extends Cellphone, FullName {
  bio: string;
  contacts: Contact[] | ContactWithCellphone[];
  blacklist: BlackListItem[];
  userId: string;
  createdAt: CreatedAt;
  username: string;
  sessions: Session[];
  status: Status;
}

export interface VerifiedSession {
  data: {
    payload: {
      sessionId: string;
    };
    signature: string;
  };
}

export type NodeEnvValue =
  | "build"
  | "development"
  | "production_local"
  | "production"
  | "test_development"
  | "test_production_local"
  | "test_production";

export type EventName =
  | "addBlock"
  | "addContact"
  | "addContactWithCellphone"
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
  | "updateOnlineStatus"
  | "updatePublicUserData"
  | "verify";

export type SocketHandlerPicker<T> = Pick<
  SocketHandlerCollection,
  Extract<EventName, T>
>;

export type SocketRoutePicker<T> = Pick<
  SocketRouteCollection,
  Extract<EventName, T>
>;

export type SocketHandlerCollection = {
  [prop in EventName]: SocketOnHandler;
};

export type SocketOnHandler = (
  socket: ServerSocket,
  data: StringMap
) =>
  | void
  | Promise<void>
  | SocketHandlerReturnValue
  | Promise<SocketHandlerReturnValue>;

export type SocketOnAnyHandler = (
  socket: ServerSocket,
  data: StringMap,
  event: string
) =>
  | void
  | SocketHandlerReturnValue
  | Promise<SocketHandlerReturnValue>
  | Promise<void>;

export type LogLevel = "debug" | "error" | "info" | "warn";

export type NativeModelKey = keyof NativeModel;

export type ValidationResult =
  | true
  | ValidationError[]
  | Promise<true | ValidationError[]>;

export interface Client extends Cellphone {
  isVerified: boolean;
  verificationCode: string;
  session: string;
}

export interface PublicUserData {
  bio: string;
  firstName: string;
  lastName: string;
  userId: string;
  username: string;
  status: {
    isActive: boolean;
  };
}

export type IPrivateChatDoc = PrivateChatMongo & Document;
export type IPrivateChatModel = Model<IPrivateChatDoc>;
export type IUserDoc = UserMongo & Document;
export type IUserModel = Model<IUserDoc>;

export type ServiceFunction<T, U, V> = (
  data: T,
  projection?: ProjectionType<U>,
  options?: QueryOptions
) => V;

export type PrivateChatService<T, U> = ServiceFunction<
  FilterQuery<T>,
  PrivateChatMongo,
  U
>;

export type UserService<T> = ServiceFunction<T, UserMongo, IUserDoc>;

export interface SocketResponse {
  data: StringMap & {
    ERRORS?: SocketResponseErrors;
  };
  ok: boolean;
}

export interface SocketResponseErrors {
  [prop: string]: NativeError & StringMap;
}

export { ClientSocket, ServerSocket };
