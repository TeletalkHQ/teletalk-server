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

interface Cellphone {
  countryCode: string;
  countryName: string;
  phoneNumber: string;
}

interface ValidationModel {
  [prop: string]: ValidationRuleObject;
}

type FieldType = "array" | "boolean" | "date" | "number" | "object" | "string";

type CustomEmit = (event: string, data: StringMap) => void;

type CustomOn = (event: string, callback: SocketOnHandler) => void;

type SocketNext = (err?: Error | undefined) => void;

type SocketEvent = Event;

type SocketMiddlewareReturnValue = {
  ok: boolean;
};

type SocketMiddleware = (
  socket: ServerSocket,
  next: SocketNext,
  event: SocketEvent
) =>
  | void
  | SocketMiddlewareReturnValue
  | Promise<void>
  | Promise<SocketMiddlewareReturnValue>;

type CustomUse = (middleware: SocketMiddleware) => void;

interface FullName {
  firstName: string;
  lastName: string;
}

interface Contact extends FullName {
  userId: string;
}

type SocketMiddlewareEvent = string | string[];

type CreatedAt = number;

interface Environments {
  CLIENT_ID_LENGTH: number;
  LOG_LEVEL: string;
  MONGO_COLLECTION_NAME: string;
  MONGO_PORT: number;
  MONGO_URL: string;
  NODE_ENV: string;
  PORT_DEFAULT: number;
  PORT: number;
  REDIS_DEFAULT_HOST: string;
  REDIS_DEFAULT_PORT: number;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  SELF_EXEC: boolean;
  SESSION_MAIN_SECRET: string;
  SESSION_SIGN_IN_SECRET: string;
  SMS_PROVIDER_1_HOST: string;
  SMS_PROVIDER_1_ROUTE: string;
  SMS_PROVIDER_1_SENDER: string;
  SMS_PROVIDER_1_TOKEN: string;
  SMS_PROVIDER_2_HOST: string;
  SMS_PROVIDER_2_REPORT_URL: string;
  SMS_PROVIDER_2_ROUTE: string;
  SMS_PROVIDER_2_TOKEN: string;
  SMS_PROVIDER_SELECTOR: number;
}

type HydratedPrivateChatMongo = HydratedDocument<PrivateChatMongo>;
type HydratedUserMongo = HydratedDocument<UserMongo>;

interface NativeError {
  description?: string;
  isAuthError: boolean;
  key: string;
  message?: string;
  reason: string;
  side: "server" | "client";
}

interface NativeModelItem {
  error: NativeError;
  value: any;
}
interface NativeModel {
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
// interface MongoModel {
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

interface Sender {
  senderId: string;
}
interface Message {
  createdAt: CreatedAt;
  messageText: string;
  messageId: string;
  sender: Sender;
}

interface Participant {
  participantId: string;
}
interface PrivateChatMongo {
  chatId: string;
  createdAt: CreatedAt;
  messages: Types.Array<Message>;
  participants: Types.Array<Participant>;
}
interface Route {
  inputFields: IoFields | Record<string, never>;
  outputFields: IoFields | Record<string, never>;
}

interface SocketHandlerReturnValue {
  data: StringMap;
}

type SocketOnHandler = (
  socket: ServerSocket,
  data: StringMap
) =>
  | void
  | Promise<void>
  | SocketHandlerReturnValue
  | Promise<SocketHandlerReturnValue>;

type SocketOnAnyHandler = (
  socket: ServerSocket,
  data: StringMap,
  event: string
) =>
  | void
  | SocketHandlerReturnValue
  | Promise<SocketHandlerReturnValue>
  | Promise<void>;

type ClientCallback = (data: SocketResponse) => void;

type SocketMethods = "on" | "onAny" | "customOn" | "once";

interface SocketRoute extends Route {
  name: string;
  handler: SocketOnHandler | SocketOnAnyHandler;
  method: SocketMethods;
}

interface Session {
  token: string;
}

interface Status {
  isActive: boolean;
}

interface StringMap {
  [key: string]: any;
}

interface BlackListItem {
  userId: string;
}

interface UserMongo extends Cellphone, FullName {
  bio: string;
  contacts: Contact[] | ContactWithCellphone[];
  blacklist: BlackListItem[];
  userId: string;
  createdAt: CreatedAt;
  username: string;
  sessions: Session[];
  status: Status;
}

interface VerifiedToken {
  data: {
    payload: {
      sessionId: string;
    };
    signature: string;
  };
}

type NodeEnvValue =
  | "build"
  | "development"
  | "production"
  | "production_local"
  | "test_development"
  | "test_production"
  | "test_production_local";

type LogLevel = "debug" | "error" | "info" | "warn";

type NativeModelKey = keyof NativeModel;

type ValidationResult =
  | true
  | ValidationError[]
  | Promise<true | ValidationError[]>;

interface TemporaryClient extends Cellphone {
  isVerified: boolean;
  verificationCode: string;
}

interface PublicUserData {
  bio: string;
  firstName: string;
  lastName: string;
  userId: string;
  username: string;
  status: {
    isActive: boolean;
  };
}

type IPrivateChatDoc = PrivateChatMongo & Document;
type IPrivateChatModel = Model<IPrivateChatDoc>;
type IUserDoc = UserMongo & Document;
type IUserModel = Model<IUserDoc>;

type ServiceFunction<T, U, V> = (
  data: T,
  projection?: ProjectionType<U>,
  options?: QueryOptions
) => V;

type PrivateChatService<T, U> = ServiceFunction<
  FilterQuery<T>,
  PrivateChatMongo,
  U
>;

type UserService<T> = ServiceFunction<T, UserMongo, IUserDoc>;

interface SocketResponse {
  data: StringMap & {
    errors?: SocketResponseErrors;
  };
  ok: boolean;
}

interface SocketResponseErrors {
  [prop: string]: NativeError & StringMap;
}

export {
  BlackListItem,
  Cellphone,
  ClientCallback,
  ClientSocket,
  Contact,
  CustomEmit,
  CustomOn,
  CustomUse,
  Environments,
  FieldType,
  FullName,
  HydratedPrivateChatMongo,
  HydratedUserMongo,
  IPrivateChatDoc,
  IPrivateChatModel,
  IUserDoc,
  IUserModel,
  LogLevel,
  Message,
  NativeError,
  NativeModel,
  NativeModelItem,
  NativeModelKey,
  NodeEnvValue,
  Participant,
  PrivateChatMongo,
  PrivateChatService,
  PublicUserData,
  Route,
  ServerSocket,
  ServiceFunction,
  Session,
  SocketEvent,
  SocketHandlerReturnValue,
  SocketMethods,
  SocketMiddleware,
  SocketMiddlewareEvent,
  SocketMiddlewareReturnValue,
  SocketNext,
  SocketOnAnyHandler,
  SocketOnHandler,
  SocketResponse,
  SocketResponseErrors,
  SocketRoute,
  StringMap,
  TemporaryClient,
  UserMongo,
  UserService,
  ValidationModel,
  ValidationResult,
  VerifiedToken,
};
