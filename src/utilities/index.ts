//@ts-ignore
import generatePassword from "generate-password";
import lodash from "lodash";
import { Socket } from "socket.io";

import { envManager } from "@/classes/EnvironmentManager";

import {
  Environments,
  ErrorCollection,
  ErrorReason,
  Field,
  NativeModelKey,
  SocketEvent,
  SocketMiddleware,
  SocketNext,
} from "@/types";

// const getHostFromRequest = (request) => request.get("host");

type Url = string | string[];
const isEventNameMatch = (url: Url, reqUrl: string) =>
  (Array.isArray(url) && url.some((u) => u === reqUrl)) || url === reqUrl;

const crashServer = (message: unknown) => {
  logger.error(message);
  process.exit(1);
};

interface ExecuteMiddlewaresArgs {
  middlewares: SocketMiddleware[];
  next: SocketNext;
  socket: Socket;
  event: SocketEvent;
}

const executeMiddlewares = async ({
  event,
  middlewares,
  next,
  socket,
}: ExecuteMiddlewaresArgs) => {
  for await (const m of middlewares) {
    const result = await m(
      socket,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      event
    );

    if (result?.ok === false) {
      return;
    }
  }

  return next();
};

const regexMaker = (pattern: string) => new RegExp(pattern);

const logEnvironments = () => logger.debug(sortEnvironments());

const initialOptions = {
  exclude: "",
  length: 6,
  lowercase: false,
  numbers: true,
  symbol: false,
  uppercase: false,
};

const passwordGenerator = (options = initialOptions) => {
  return generatePassword.generate({
    ...initialOptions,
    ...options,
  });
};

const sortEnvironments = () =>
  Object.entries(envManager.getEnvironment())
    .map(([prop, value]) => ({ prop, value }))
    .sort((a, b) => a.prop.localeCompare(b.prop))
    .reduce((prevValue, currentValue) => {
      const value = currentValue.value;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (prevValue as any)[currentValue.prop] = value;

      return prevValue;
    }, {} as Environments);

const extractClientIdFromCookie = (cookie: string) => {
  const [rawCookie] = cookie.split("; ");
  return rawCookie.split("=")[1];
};

const findError = (
  errors: ErrorCollection,
  fieldName: Field,
  modelKeyName: NativeModelKey
) => {
  return errors[makeErrorReason(fieldName, modelKeyName) as ErrorReason];
};

const makeErrorReason = (fieldName: Field, modelKeyName: NativeModelKey) => {
  const FIELD_NAME = makeUpperFieldName(fieldName);

  if (modelKeyName === "empty") return `${FIELD_NAME}_EMPTY` as ErrorReason;
  if (modelKeyName === "length")
    return `${FIELD_NAME}_INVALID_LENGTH` as ErrorReason;
  if (modelKeyName === "maxLength")
    return `${FIELD_NAME}_MAX_LENGTH_REACH` as ErrorReason;
  if (modelKeyName === "minLength")
    return `${FIELD_NAME}_MIN_LENGTH_REACH` as ErrorReason;
  if (modelKeyName === "numeric") return `${FIELD_NAME}_NUMERIC` as ErrorReason;
  if (modelKeyName === "required")
    return `${FIELD_NAME}_REQUIRED` as ErrorReason;
  if (modelKeyName === "type")
    return `${FIELD_NAME}_INVALID_TYPE` as ErrorReason;
  if (modelKeyName === "unique") return `${FIELD_NAME}_EXIST` as ErrorReason;

  return `${FIELD_NAME}_INVALID` as ErrorReason;
};

const makeUpperFieldName = (fieldName: Field) =>
  lodash.snakeCase(fieldName).toUpperCase();

const utilities = {
  crashServer,
  executeMiddlewares,
  extractClientIdFromCookie,
  findError,
  isEventNameMatch,
  logEnvironments,
  makeErrorReason,
  makeUpperFieldName,
  passwordGenerator,
  regexMaker,
  sortEnvironments,
};

export { utilities };
