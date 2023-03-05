import { SocketMethods } from "@/types";

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

interface IError {
  key: string;
  reason: string;
  statusCode: number;
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
interface MongoModel {
  default: [unknown, IError];
  empty: [boolean, IError];
  items: [];
  lowercase: [];
  maxlength: [];
  minlength: [];
  required: [];
  trim: [];
  type: [];
  unique: [];
}

interface Route {
  inputFields: IoField | Record<string, never>;
  outputFields: IoField | Record<string, never>;
  statusCode: number;
}

interface SocketRoute extends Route {
  name: string;
  handler: () => void;
  method: SocketMethods;
}

interface VerifiedToken {
  data: {
    payload: {
      tokenId: string;
    };
  };
}

export {
  Environments,
  IError,
  IoField,
  NativeModel,
  NativeModelError,
  NativeModelItem,
  Route,
  SocketRoute,
  VerifiedToken,
};
