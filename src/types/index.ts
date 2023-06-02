/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Event, Socket } from "socket.io";
import { ContactWithCellphone } from "utility-store/lib/types";
import { NativeModelCollection } from ".";
import { JWTPayload, JWTVerifyResult } from "jose";

export interface Cellphone {
  countryCode: string;
  countryName: string;
  phoneNumber: string;
}

export type Validator = (param: any) => Promise<void>;

export type Field =
  | "bio"
  | "blacklist"
  | "chatId"
  | "clientId"
  | "clients"
  | "contacts"
  | "countryCode"
  | "countryName"
  | "createdAt"
  | "firstName"
  | "id"
  | "isActive"
  | "lastName"
  | "macAddress"
  | "messageId"
  | "messages"
  | "messageText"
  | "participantId"
  | "participants"
  | "phoneNumber"
  | "privateChats"
  | "senderId"
  | "status"
  | "userId"
  | "username"
  | "verificationCode";

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
  | "updatePublicUserData"
  | "verify";

export type NodeEnvValue =
  | "build"
  | "development"
  | "production_local"
  | "production"
  | "test_development"
  | "test_production_local"
  | "test_production";

export type EnvFileName = NodeEnvValue | "base";

export interface StringMap {
  [prop: string]: any;
}

export interface SocketHandlerReturnValue {
  data: StringMap;
}

export type SocketOnHandler = (
  socket: Socket,
  data: StringMap
) =>
  | void
  | Promise<void>
  | SocketHandlerReturnValue
  | Promise<SocketHandlerReturnValue>;

export type SocketOnAnyHandler = (
  socket: Socket,
  data: StringMap,
  event: string
) =>
  | void
  | SocketHandlerReturnValue
  | Promise<SocketHandlerReturnValue>
  | Promise<void>;

export type CustomEmit = (event: string, data: StringMap) => void;

export type CustomOn = (event: string, callback: SocketOnHandler) => void;

export type SocketNext = (err?: Error | undefined) => void;

export type SocketEvent = Event;

export type SocketMiddlewareReturnValue = {
  ok: boolean;
};

export type SocketMiddleware = (
  socket: Socket,
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

export type SocketMiddlewareEvent = EventName | EventName[];

export type LogLevel = "debug" | "error" | "info" | "warn";

export interface Environments {
  CLIENT_SECRET: string;
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

export interface Sender {
  senderId: string;
}
export interface Message {
  createdAt: number;
  messageText: string;
  messageId: string;
  sender: Sender;
}

export interface Participant {
  participantId: string;
}

export interface PrivateChatMongo {
  chatId: string;
  createdAt: number;
  messages: Types.Array<Message>;
  participants: Types.Array<Participant>;
}

export interface ClientObjType {
  clientId: string;
}

export interface StatusObjType {
  isActive: boolean;
}

export interface BlackListItem {
  userId: string;
}

export interface UserMongo extends Cellphone, FullName {
  bio: string;
  contacts: Contact[] | ContactWithCellphone[];
  blacklist: BlackListItem[];
  userId: string;
  createdAt: number;
  username: string;
  clients: ClientObjType[];
  status: StatusObjType;
}

export type HydratedPrivateChatMongo = HydratedDocument<PrivateChatMongo>;
export type HydratedUserMongo = HydratedDocument<UserMongo>;

export type ErrorSide = "server" | "client";

type AllErrorKeys = {
  [T in keyof NativeModelCollection]: `${T}_${keyof NativeModelCollection[T] &
    string}_error`;
};

export type ModelErrorReason =
  | AllErrorKeys[keyof AllErrorKeys]
  | `${keyof NativeModelCollection}_invalid`;

export type CustomErrorReason =
  | "blacklistItemExist"
  | "blacklistItemNotExist"
  | "chatNotExist"
  | "client_invalid"
  | "clientCookieRequired"
  | "clientIdCanNotVerified"
  | "clientNotFound"
  | "clientNotVerified"
  | "contactItemExist"
  | "contactItemNotExist"
  | "cookieIsNotDefined"
  | "countryCodeNotSupported"
  | "countryNameNotSupported"
  | "currentClientNotExist"
  | "currentUserExist"
  | "currentUserNotExist"
  | "eventNotFound"
  | "inputDataNotDefined"
  | "inputFieldInvalidType"
  | "inputFieldsMissing"
  | "inputFieldsOverload"
  | "isNotACallback"
  | "outputDataNotDefined"
  | "outputFieldInvalidType"
  | "outputFieldsMissing"
  | "outputFieldsOverload"
  | "outputFieldTypeWrong"
  | "requiredFieldInvalid"
  | "requiredFieldInvalidType"
  | "requiredFieldsNotDefined"
  | "requiredIoFieldIsNotArray"
  | "requiredIoFieldIsNotObject"
  | "routeNotFound"
  | "selfStuff"
  | "senderEmpty"
  | "sendJsonResponseIsNotFunction"
  | "sendSmsFailed"
  | "serverCriticalError"
  | "targetUserNotExist"
  | "unknownError"
  | "userExist"
  | "userNoLongerParticipant";

export type ErrorReason = ModelErrorReason | CustomErrorReason;

export interface NativeError {
  description?: string;
  isAuthError: boolean;
  message?: string;
  reason: ErrorReason;
  side: ErrorSide;
}

export type ModelErrorCollection = {
  [prop in ModelErrorReason]: NativeError;
};

export type ErrorCollection = {
  [prop in ErrorReason]: NativeError;
};

export interface Route {
  inputFields: IoFields | Record<string, never>;
  outputFields: IoFields | Record<string, never>;
  isAuthRequired: boolean;
}

export interface SocketResponseErrors {
  [prop: string]: NativeError & StringMap;
}

export interface SocketResponse<Response = StringMap> {
  data: Response;
  errors?: SocketResponseErrors;
  ok: boolean;
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

export type SocketHandlerCollection = {
  [prop in EventName]: SocketOnHandler;
};

export type SocketHandlerPicker<T extends EventName> = Pick<
  SocketHandlerCollection,
  Extract<EventName, T>
>;

export type SocketRoutePicker<T extends EventName> = Pick<
  SocketRouteCollection,
  Extract<EventName, T>
>;

export type ValidationModel = ValidationRuleObject;

export type ValidationCollection = {
  [F in Field]: ValidationModel;
};

export type ValidationPicker<T extends Field> = Pick<
  ValidationCollection,
  Extract<Field, T>
>;

export type ValidationResult =
  | true
  | ValidationError[]
  | Promise<true | ValidationError[]>;

export interface StoredClient extends Cellphone {
  isVerified: boolean;
  verificationCode: string;
  userId: string;
}

export interface PublicUserData {
  bio: string;
  firstName: string;
  lastName: string;
  userId: string;
  username: string;
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

export type { Socket };

export * from "@/types/models";

// type SnakeCase<S extends string> = S extends `${infer T1}_${infer T2}`
//   ? `${SnakeCase<T1>}_${SnakeCase<T2>}`
//   : S extends `${infer T1}${infer T2}`
//   ? `${Lowercase<T1>}${SnakeCase<T2>}`
//   : S;

// type AllErrorKeys2 = {
//   bio: SnakeCase<keyof NativeModelCollection["bio"]> extends `required`
//     ? `BIO_REQUIRED_ERROR`
//     : never;
//   username: SnakeCase<keyof NativeModelCollection["username"]> extends `isempty`
//     ? `USERNAME_ISEMPTY_ERROR`
//     : never;
// }[Field];

// type AllErrors = `${AllErrorKeys2}`;

export interface AuthClientPayload extends JWTPayload {
  clientId: string;
}

export interface AuthClient extends JWTVerifyResult {
  payload: AuthClientPayload;
}
