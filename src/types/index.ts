/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoFields } from "check-fields";
import { ValidationError, ValidationRuleObject } from "fastest-validator";
import { AsyncCheckFunction, SyncCheckFunction } from "fastest-validator";
import { JWTPayload, JWTVerifyResult } from "jose";
import { Socket } from "socket.io";
import { Cellphone } from "utility-store/lib/types";

import { helpers } from "~/helpers";

import { ModelErrorReason } from "./models";

export type Validator = (param: any) => Promise<void>;

export type Field =
  | "bio"
  | "chatId"
  | "clientId"
  | "countryCode"
  | "countryName"
  | "createdAt"
  | "firstName"
  | "id"
  | "isActive"
  | "lastName"
  | "macAddress"
  | "messageId"
  | "messageText"
  | "participantId"
  | "phoneNumber"
  | "senderId"
  | "userId"
  | "username"
  | "verificationCode";

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

export type ErrorSide = "server" | "client";

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

export type ErrorCollection = {
  [prop in ErrorReason]: NativeError;
};

export type ValidationModel = ValidationRuleObject;

export type ValidationCollection = {
  [F in Field]: ValidationModel;
};

const ERROR_TYPES = helpers.getDefaultValidatorErrorTypes();
export type ErrorTypes = typeof ERROR_TYPES;
export type ValidationErrors = ValidationError[];

export interface ValidationCheckerError extends NativeError {
  result: ValidationErrors;
}
export type ValidationResult = true | ValidationErrors;

export type FieldValidator = AsyncCheckFunction | SyncCheckFunction;
export type ValidationCheckerFn = (r: ValidationResult, value: unknown) => void;
export type ValidationCheckerFnCollection = {
  [prop in Field]: ValidationCheckerFn;
};

export interface Route {
  inputFields: IoFields | Record<string, never>;
  outputFields: IoFields | Record<string, never>;
  isAuthRequired: boolean;
}

export interface StoredClient extends Cellphone {
  isVerified: boolean;
  verificationCode: string;
  userId: string;
}

export type { Socket };

export interface AuthClientPayload extends JWTPayload {
  clientId: string;
}

export interface AuthClient extends JWTVerifyResult {
  payload: AuthClientPayload;
}

export type * from "./api";

// type SnakeCase<S extends string> = S extends `${infer T1}_${infer T2}`
//   ? `${SnakeCase<T1>}_${SnakeCase<T2>}`
//   : S extends `${infer T1}${infer T2}`
//   ? `${Lowercase<T1>}${SnakeCase<T2>}`
//   : S;

// type AllErrors = `${AllErrorKeys2}`;

// export type ValidationPicker<T extends Field> = Pick<
//   ValidationCollection,
//   Extract<Field, T>
// >;
