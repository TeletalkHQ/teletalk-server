/* eslint-disable no-use-before-define */
import { IoFields } from "check-fields";
import { ValidationError } from "fastest-validator";
import { HydratedDocument, Types } from "mongoose";
import { Socket, Event } from "socket.io";

interface Cellphone {
  countryCode: string;
  countryName: string;
  phoneNumber: string;
}

type CustomEmit = (event: string, data: StringMap) => void;

type CustomOn = (event: string, callback: SocketHandler) => void;

type SocketNext = (err?: Error | undefined) => void;

type SocketEvent = Event;

type SocketMiddleware = (
  socket: Socket,
  next: SocketNext,
  event: SocketEvent
) => Promise<void> | void;

type CustomUse = (middleware: SocketMiddleware) => void;

interface FullName {
  firstName: string;
  lastName: string;
}

interface Contact extends Cellphone, FullName {}

type CreatedAt = number;

interface Environments {
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

interface NativeModelError {
  description: string;
  key: string;
  message: string;
  reason: string;
  statusCode: number;
}

interface NativeModelItem {
  error: NativeModelError;
  value: any;
}
interface NativeModel {
  defaultValue: {
    value: any;
    error: NativeModelError;
  };
  empty: {
    value: boolean;
    error: NativeModelError;
  };
  items: {
    value: any[];
    error: NativeModelError;
  };
  length: {
    value: number;
    error: NativeModelError;
  };
  maxlength: {
    value: number;
    error: NativeModelError;
  };
  minlength: {
    value: number;
    error: NativeModelError;
  };
  numeric: {
    value: boolean;
    error: NativeModelError;
  };
  required: {
    value: boolean;
    error: NativeModelError;
  };
  trim: { value: boolean; error?: NativeModelError };
  type: {
    value: string;
    error: NativeModelError;
  };
  unique: {
    value: boolean;
    error: NativeModelError;
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
  message: string;
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
  statusCode: number;
}

type SocketHandler = (socket: Socket, data: StringMap) => any | Promise<any>;

type ClientCallback = (...args: unknown[]) => unknown;

type SocketMethods = "on" | "onAny" | "customOn" | "once";

interface SocketRoute extends Route {
  name: string;
  handler: SocketHandler;
  method: SocketMethods;
}

interface Session {
  token: string;
}

interface Status {
  isOnline: boolean;
}

interface StringMap {
  [key: string]: any;
}

interface UserMongo extends Cellphone, FullName {
  bio: string;
  contacts: Types.Array<Contact>;
  blacklist: Types.Array<Cellphone>;
  userId: string;
  createdAt: CreatedAt;
  username: string;
  sessions: Session[];
  status: Status;
}

interface VerifiedToken {
  data: {
    payload: {
      tokenId: string;
    };
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

export {
  Cellphone,
  ClientCallback,
  Contact,
  CustomEmit,
  CustomOn,
  CustomUse,
  Environments,
  HydratedPrivateChatMongo,
  HydratedUserMongo,
  LogLevel,
  Message,
  NativeModel,
  NativeModelError,
  NativeModelItem,
  NativeModelKey,
  NodeEnvValue,
  PrivateChatMongo,
  Route,
  SocketEvent,
  SocketHandler,
  SocketMethods,
  SocketMiddleware,
  SocketNext,
  SocketRoute,
  StringMap,
  UserMongo,
  ValidationResult,
  VerifiedToken,
};
