import { ValidationError } from "fastest-validator";
import { Types } from "mongoose";

interface Cellphone {
  countryCode: string;
  countryName: string;
  phoneNumber: string;
}

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

interface IoField {
  type: string;
  value: undefined | IoField | IoField[];
  required: boolean;
}

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
  inputFields: IoField | Record<string, never>;
  outputFields: IoField | Record<string, never>;
  statusCode: number;
}

type SocketMethods = "on" | "onAny" | "customOn" | "once";
interface SocketRoute extends Route {
  name: string;
  handler: () => void;
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
  sessions: Session;
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
  Contact,
  Environments,
  IoField,
  LogLevel,
  NativeModel,
  NativeModelError,
  NativeModelItem,
  NativeModelKey,
  NodeEnvValue,
  PrivateChatMongo,
  Route,
  SocketMethods,
  SocketRoute,
  StringMap,
  UserMongo,
  ValidationResult,
  VerifiedToken,
};
