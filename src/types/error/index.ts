import { ModelErrorReason } from "../models";

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
