import { errorBuilder } from "~/classes/ErrorBuilder";
import { modelErrorBuilder } from "~/classes/ModelErrorBuilder";
import { ErrorCollection } from "~/types";

const customErrors = {
  blacklistItemExist: errorBuilder().reason("blacklistItemExist").build(),
  blacklistItemNotExist: errorBuilder().reason("blacklistItemNotExist").build(),
  chatNotExist: errorBuilder().reason("chatNotExist").build(),
  client_invalid: errorBuilder().reason("client_invalid").build(),
  clientCookieRequired: errorBuilder().reason("clientCookieRequired").build(),
  clientIdCanNotVerified: errorBuilder()
    .reason("clientIdCanNotVerified")
    .build(),
  clientNotFound: errorBuilder().reason("clientNotFound").build(),
  clientNotVerified: errorBuilder().reason("clientNotVerified").build(),
  contactItemExist: errorBuilder().reason("contactItemExist").build(),
  contactItemNotExist: errorBuilder().reason("contactItemNotExist").build(),
  cookieIsNotDefined: errorBuilder()
    .reason("cookieIsNotDefined")
    .side("client")
    .build(),
  countryCodeNotSupported: errorBuilder()
    .reason("countryCodeNotSupported")
    .build(),
  countryNameNotSupported: errorBuilder()
    .reason("countryNameNotSupported")
    .build(),
  currentClientNotExist: errorBuilder().reason("currentClientNotExist").build(),
  currentUserExist: errorBuilder().reason("currentUserExist").build(),
  currentUserNotExist: errorBuilder().reason("currentUserNotExist").build(),
  eventNotFound: errorBuilder().reason("eventNotFound").build(),
  inputDataNotDefined: errorBuilder().reason("inputDataNotDefined").build(),
  inputFieldInvalidType: errorBuilder().reason("inputFieldInvalidType").build(),
  inputFieldsMissing: errorBuilder().reason("inputFieldsMissing").build(),
  inputFieldsOverload: errorBuilder().reason("inputFieldsOverload").build(),
  isNotACallback: errorBuilder().reason("isNotACallback").build(),
  outputDataNotDefined: errorBuilder().reason("outputDataNotDefined").build(),
  outputFieldInvalidType: errorBuilder()
    .reason("outputFieldInvalidType")
    .side("server")
    .build(),
  outputFieldsMissing: errorBuilder()
    .reason("outputFieldsMissing")
    .side("server")
    .build(),
  outputFieldsOverload: errorBuilder()
    .reason("outputFieldsOverload")
    .side("server")
    .build(),
  outputFieldTypeWrong: errorBuilder()
    .reason("outputFieldTypeWrong")
    .side("server")
    .build(),
  requiredFieldInvalid: errorBuilder()
    .reason("requiredFieldInvalid")
    .side("server")
    .build(),
  requiredFieldInvalidType: errorBuilder()
    .reason("requiredFieldInvalidType")
    .side("server")
    .build(),
  requiredFieldsNotDefined: errorBuilder()
    .reason("requiredFieldsNotDefined")
    .side("server")
    .build(),
  requiredIoFieldIsNotArray: errorBuilder()
    .reason("requiredIoFieldIsNotArray")
    .side("server")
    .build(),
  requiredIoFieldIsNotObject: errorBuilder()
    .reason("requiredIoFieldIsNotObject")
    .side("server")
    .build(),
  selfStuff: errorBuilder().reason("selfStuff").build(),
  senderEmpty: errorBuilder().reason("senderEmpty").build(),
  sendJsonResponseIsNotFunction: errorBuilder()
    .reason("sendJsonResponseIsNotFunction")
    .side("server")
    .build(),
  sendSmsFailed: errorBuilder().reason("sendSmsFailed").side("server").build(),
  serverCriticalError: errorBuilder()
    .reason("serverCriticalError")
    .side("server")
    .build(),
  targetUserNotExist: errorBuilder().reason("targetUserNotExist").build(),
  unknownError: errorBuilder().reason("unknownError").side("server").build(),
  userExist: errorBuilder().reason("userExist").build(),
  userNoLongerParticipant: errorBuilder()
    .reason("userNoLongerParticipant")
    .build(),
};

const modelErrors = modelErrorBuilder().build();

export const errors: ErrorCollection = {
  ...customErrors,
  ...modelErrors,
};

const requiredFieldErrors = {
  schemaInvalid: errors.requiredFieldInvalid,
  schemaInvalidType: errors.requiredFieldInvalidType,
  schemaNotDefined: errors.requiredFieldsNotDefined,
};

export const checkFieldErrors = {
  input: {
    ...requiredFieldErrors,
    dataFieldInvalidType: errors.inputFieldInvalidType,
    dataFieldsMissing: errors.inputFieldsMissing,
    dataFieldsOverload: errors.inputFieldsOverload,
    dataNotDefined: errors.inputDataNotDefined,
  },
  output: {
    ...requiredFieldErrors,
    dataFieldInvalidType: errors.outputFieldInvalidType,
    dataFieldsMissing: errors.outputFieldsMissing,
    dataFieldsOverload: errors.outputFieldsOverload,
    dataNotDefined: errors.outputDataNotDefined,
  },
};

export const localErrors = {
  eventIsInvalid: {
    reason: "eventIsInvalid",
  },
  validationModelIsNotObject: {
    message: "You must pass validationModel as a object",
    reason: "validationModelIsNotObject",
  },
};
