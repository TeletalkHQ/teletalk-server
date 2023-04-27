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
  | "contacts"
  | "countryCode"
  | "countryName"
  | "createdAt"
  | "firstName"
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
  | "session"
  | "sessions"
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

export type FieldType =
  | "array"
  | "boolean"
  | "date"
  | "number"
  | "object"
  | "string";

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

export type SocketMiddlewareEvent = string | string[];

export type CreatedAt = number;

export type LogLevel = "debug" | "error" | "info" | "warn";

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

export interface Session {
  session: string;
}

export interface Status {
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

export type HydratedPrivateChatMongo = HydratedDocument<PrivateChatMongo>;
export type HydratedUserMongo = HydratedDocument<UserMongo>;

export type ErrorReason =
  | "BIO_EMPTY"
  | "BIO_INVALID_TYPE"
  | "BIO_INVALID"
  | "BIO_MAX_LENGTH_REACH"
  | "BIO_MIN_LENGTH_REACH"
  | "BIO_REQUIRED"
  | "BLACKLIST_INVALID_TYPE"
  | "BLACKLIST_ITEM_EXIST"
  | "BLACKLIST_ITEM_NOT_EXIST"
  | "BLACKLIST_REQUIRED"
  | "CHAT_EXIST"
  | "CHAT_ID_EMPTY"
  | "CHAT_ID_EXIST"
  | "CHAT_ID_INVALID_TYPE"
  | "CHAT_ID_INVALID"
  | "CHAT_ID_MAX_LENGTH_REACH"
  | "CHAT_ID_MIN_LENGTH_REACH"
  | "CHAT_ID_REQUIRED"
  | "CHAT_NOT_EXIST"
  | "CHATS_INVALID_TYPE"
  | "CLIENT_ID_EMPTY"
  | "CLIENT_ID_EXIST"
  | "CLIENT_ID_INVALID_TYPE"
  | "CLIENT_ID_MAX_LENGTH_REACH"
  | "CLIENT_ID_MIN_LENGTH_REACH"
  | "CLIENT_ID_NOT_DEFINED"
  | "CLIENT_ID_REQUIRED"
  | "CLIENT_NOT_FOUND"
  | "CLIENT_NOT_VERIFIED"
  | "CONTACT_INVALID_TYPE"
  | "CONTACT_ITEM_EXIST"
  | "CONTACT_ITEM_NOT_EXIST"
  | "CONTACTS_INVALID_TYPE"
  | "CONTACTS_REQUIRED"
  | "COOKIE_IS_UNDEFINED"
  | "COUNTRY_CODE_EMPTY"
  | "COUNTRY_CODE_INVALID_TYPE"
  | "COUNTRY_CODE_INVALID"
  | "COUNTRY_CODE_MAX_LENGTH_REACH"
  | "COUNTRY_CODE_MIN_LENGTH_REACH"
  | "COUNTRY_CODE_NOT_SUPPORTED"
  | "COUNTRY_CODE_NUMERIC"
  | "COUNTRY_CODE_REQUIRED"
  | "COUNTRY_NAME_EMPTY"
  | "COUNTRY_NAME_INVALID_TYPE"
  | "COUNTRY_NAME_INVALID"
  | "COUNTRY_NAME_MAX_LENGTH_REACH"
  | "COUNTRY_NAME_MIN_LENGTH_REACH"
  | "COUNTRY_NAME_NOT_SUPPORTED"
  | "COUNTRY_NAME_REQUIRED"
  | "COUNTRY_NOT_SUPPORTED"
  | "CREATED_AT_EMPTY"
  | "CREATED_AT_INVALID_TYPE"
  | "CREATED_AT_REQUIRED"
  | "CURRENT_SESSION_NOT_EXIST"
  | "CURRENT_USER_EXIST"
  | "CURRENT_USER_NOT_EXIST"
  | "EVENT_NOT_FOUND"
  | "FIRST_NAME_EMPTY"
  | "FIRST_NAME_INVALID_TYPE"
  | "FIRST_NAME_INVALID"
  | "FIRST_NAME_MAX_LENGTH_REACH"
  | "FIRST_NAME_MIN_LENGTH_REACH"
  | "FIRST_NAME_REQUIRED"
  | "FULL_NAME_INVALID"
  | "INPUT_DATA_NOT_DEFINED"
  | "INPUT_FIELD_INVALID_TYPE"
  | "INPUT_FIELDS_MISSING"
  | "INPUT_FIELDS_OVERLOAD"
  | "IS_NOT_A_CALLBACK"
  | "LAST_NAME_EMPTY"
  | "LAST_NAME_INVALID_TYPE"
  | "LAST_NAME_INVALID"
  | "LAST_NAME_MAX_LENGTH_REACH"
  | "LAST_NAME_MIN_LENGTH_REACH"
  | "LAST_NAME_REQUIRED"
  | "MAC_ADDRESS_EMPTY"
  | "MAC_ADDRESS_EXIST"
  | "MAC_ADDRESS_INVALID_TYPE"
  | "MAC_ADDRESS_MAX_LENGTH_REACH"
  | "MAC_ADDRESS_MIN_LENGTH_REACH"
  | "MAC_ADDRESS_REQUIRED"
  | "MESSAGE_ID_EMPTY"
  | "MESSAGE_ID_EXIST"
  | "MESSAGE_ID_INVALID_TYPE"
  | "MESSAGE_ID_MAX_LENGTH_REACH"
  | "MESSAGE_ID_MIN_LENGTH_REACH"
  | "MESSAGE_ID_REQUIRED"
  | "MESSAGE_TEXT_EMPTY"
  | "MESSAGE_TEXT_INVALID_TYPE"
  | "MESSAGE_TEXT_INVALID"
  | "MESSAGE_TEXT_MAX_LENGTH_REACH"
  | "MESSAGE_TEXT_MIN_LENGTH_REACH"
  | "MESSAGE_TEXT_REQUIRED"
  | "MESSAGES_INVALID_TYPE"
  | "MESSAGES_REQUIRED"
  | "ONLINE_INVALID_TYPE"
  | "ONLINE_REQUIRED"
  | "OUTPUT_DATA_NOT_DEFINED"
  | "OUTPUT_FIELD_INVALID_TYPE"
  | "OUTPUT_FIELD_TYPE_WRONG"
  | "OUTPUT_FIELDS_MISSING"
  | "OUTPUT_FIELDS_OVERLOAD"
  | "PARTICIPANT_EMPTY"
  | "PARTICIPANT_ID_EMPTY"
  | "PARTICIPANT_ID_EXIST"
  | "PARTICIPANT_ID_INVALID_TYPE"
  | "PARTICIPANT_ID_INVALID"
  | "PARTICIPANT_ID_MAX_LENGTH_REACH"
  | "PARTICIPANT_ID_MIN_LENGTH_REACH"
  | "PARTICIPANT_ID_REQUIRED"
  | "PARTICIPANT_NOT_EXIST"
  | "PARTICIPANTS_EMPTY"
  | "PARTICIPANTS_INVALID_LENGTH"
  | "PARTICIPANTS_INVALID_TYPE"
  | "PARTICIPANTS_REQUIRED"
  | "PHONE_NUMBER_EMPTY"
  | "PHONE_NUMBER_EXIST"
  | "PHONE_NUMBER_INVALID_TYPE"
  | "PHONE_NUMBER_INVALID"
  | "PHONE_NUMBER_MAX_LENGTH_REACH"
  | "PHONE_NUMBER_MIN_LENGTH_REACH"
  | "PHONE_NUMBER_NUMERIC"
  | "PHONE_NUMBER_REQUIRED"
  | "PRIVATE_CHATS_INVALID_TYPE"
  | "PRIVATE_CHATS_REQUIRED"
  | "REQUEST_BODY_IS_UNDEFINED"
  | "REQUIRED_FIELD_INVALID_TYPE"
  | "REQUIRED_FIELD_INVALID"
  | "REQUIRED_FIELDS_NOT_DEFINED"
  | "REQUIRED_IO_FIELD_IS_NOT_ARRAY"
  | "REQUIRED_IO_FIELD_IS_NOT_OBJECT"
  | "ROUTE_NOT_FOUND"
  | "SELF_STUFF"
  | "SEND_JSON_RESPONSE_IS_NOT_FUNCTION"
  | "SEND_SMS_FAILED"
  | "SENDER_EMPTY"
  | "SENDER_ID_EXIST"
  | "SENDER_ID_INVALID_TYPE"
  | "SENDER_ID_MAX_LENGTH_REACH"
  | "SENDER_ID_MIN_LENGTH_REACH"
  | "SENDER_ID_REQUIRED"
  | "SERVER_CRITICAL_ERROR"
  | "SESSION_CAN_NOT_VERIFIED"
  | "SESSION_EMPTY"
  | "SESSION_EXIST"
  | "SESSION_INVALID_TYPE"
  | "SESSION_INVALID"
  | "SESSION_MAX_LENGTH_REACH"
  | "SESSION_MIN_LENGTH_REACH"
  | "SESSION_REQUIRED"
  | "SESSIONS_INVALID_TYPE"
  | "SESSIONS_REQUIRED"
  | "STATUS_INVALID_TYPE"
  | "STATUS_REQUIRED"
  | "TARGET_USER_NOT_EXIST"
  | "UNKNOWN_ERROR"
  | "USER_EXIST"
  | "USER_ID_EMPTY"
  | "USER_ID_EXIST"
  | "USER_ID_INVALID_TYPE"
  | "USER_ID_INVALID"
  | "USER_ID_MAX_LENGTH_REACH"
  | "USER_ID_MIN_LENGTH_REACH"
  | "USER_ID_REQUIRED"
  | "USER_NO_LONGER_PARTICIPANT"
  | "USERNAME_EMPTY"
  | "USERNAME_EXIST"
  | "USERNAME_INVALID_TYPE"
  | "USERNAME_INVALID"
  | "USERNAME_MAX_LENGTH_REACH"
  | "USERNAME_MIN_LENGTH_REACH"
  | "USERNAME_REQUIRED"
  | "VERIFICATION_CODE_EMPTY"
  | "VERIFICATION_CODE_INVALID_LENGTH"
  | "VERIFICATION_CODE_INVALID_TYPE"
  | "VERIFICATION_CODE_INVALID"
  | "VERIFICATION_CODE_MAX_LENGTH_REACH"
  | "VERIFICATION_CODE_NUMERIC"
  | "VERIFICATION_CODE_REQUIRED";

export type ErrorSide = "server" | "client";

export interface NativeError {
  description?: string;
  isAuthError: boolean;
  message?: string;
  reason: ErrorReason;
  side: ErrorSide;
}

export type ErrorCollection = {
  [prop in ErrorReason]: NativeError;
};

// export interface MongoModel {
//   default: [unknown, IError];
//   empty: [boolean, IError];
//   items: [];
//   lowercase: [];
//   maxLength: [];
//   minLength: [];
//   required: [];
//   trim: [];
//   type: [];
//   unique: [];
// }

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

export interface NativeModel {
  defaultValue: any;
  empty: boolean;
  items: any[];
  length: number;
  maxLength: number;
  minLength: number;
  numeric: boolean;
  required: boolean;
  trim: boolean;
  type: FieldType;
  unique: boolean;
}

export type NativeModelKey = keyof NativeModel;

export type NativeModelCollection = {
  [F in Field]: NativeModel;
};

export type NativeModelPicker<T extends Field> = Pick<
  NativeModelCollection,
  Extract<Field, T>
>;

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

// export type ValidationModel<F extends Field = any> = {
//   [P in F]: ValidationRuleObject;
// };
