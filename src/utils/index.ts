import generatePassword from "generate-password";
import lodash from "lodash";
import { Socket } from "socket.io";
import { EventName, IOCollection } from "teletalk-type-store";
import { ScreamingSnakeCase } from "type-fest";

import { envManager } from "~/classes/EnvironmentManager";
import { nativeModels } from "~/models/native";
import {
  Environments,
  ErrorReason,
  SocketMiddleware,
  SocketMiddlewareEvent,
  SocketNext,
  SocketResponse,
  UnknownError,
} from "~/types";
import {
  Field,
  ModelErrorReason,
  NativeModelCollection,
  NativeModelKey,
} from "~/types/model";
import { errors } from "~/variables/errors";

import { databaseUtils } from "./database";
import { middlewareUtils } from "./middleware";

type Url = EventName | EventName[];

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
  socketMiddlewareEvent: SocketMiddlewareEvent;
}

const executeMiddlewares = async ({
  middlewares,
  next,
  socket,
  socketMiddlewareEvent,
}: ExecuteMiddlewaresArgs) => {
  for await (const m of middlewares) {
    const result = await m(
      socket,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      socketMiddlewareEvent
    );

    if (result?.ok === false) {
      return;
    }
  }

  next();
};

const regexMaker = (pattern: string) => new RegExp(pattern);

const logEnvironments = () => logger.debug(sortEnvironments());

const passwordGenerator = (options: generatePassword.GenerateOptions = {}) => {
  return generatePassword.generate({
    exclude: "",
    length: 6,
    lowercase: false,
    numbers: true,
    symbols: false,
    uppercase: false,
    ...options,
  });
};

const sortEnvironments = () =>
  Object.entries(envManager.getEnv())
    .map(([prop, value]) => ({ prop, value }))
    .sort((a, b) => a.prop.localeCompare(b.prop))
    .reduce((prevValue, currentValue) => {
      const value = currentValue.value;
      (prevValue as any)[currentValue.prop] = value;

      return prevValue;
    }, {} as Environments);

const extractClientFromCookie = (cookie: string) => {
  const [rawCookie] = cookie.split("; ");
  return rawCookie.split("=")[1];
};

const makeScreamingSnakeCase = <T extends string>(value: T) =>
  upperSnake(value) as ScreamingSnakeCase<T>;

const upperSnake = (value: string) => lodash.snakeCase(value).toUpperCase();

const resolveResponseError = (error: UnknownError) =>
  Array.isArray(error)
    ? error
    : error?.reason
      ? [error]
      : [errors.custom.find((i) => i.reason === "UNKNOWN_ERROR")!];

const getDefaultValidatorErrorTypes = () => ({
  array: false,
  arrayContains: false,
  arrayEmpty: false,
  arrayEnum: false,
  arrayLength: false,
  arrayMax: false,
  arrayMin: false,
  arrayUnique: false,
  boolean: false,
  date: false,
  dateMax: false,
  dateMin: false,
  email: false,
  emailEmpty: false,
  emailMax: false,
  emailMin: false,
  enumValue: false,
  equalField: false,
  equalValue: false,
  forbidden: false,
  function: false,
  luhn: false,
  mac: false,
  number: false,
  numberEqual: false,
  numberInteger: false,
  numberMax: false,
  numberMin: false,
  numberNegative: false,
  numberNotEqual: false,
  numberPositive: false,
  object: false,
  objectMaxProps: false,
  objectMinProps: false,
  objectStrict: false,
  required: false,
  string: false,
  stringAlpha: false,
  stringAlphadash: false,
  stringAlphanum: false,
  stringBase64: false,
  stringContains: false,
  stringEmpty: false,
  stringEnum: false,
  stringHex: false,
  stringLength: false,
  stringMax: false,
  stringMin: false,
  stringNumeric: false,
  stringPattern: false,
  stringSingleLine: false,
  tuple: false,
  tupleEmpty: false,
  tupleLength: false,
  url: false,
  uuid: false,
  uuidVersion: false,
});

//TODO: Add more support like trim and required
function makeMongoSchemaValue<P extends keyof NativeModelCollection>(
  fieldName: P
) {
  return function <F extends keyof NativeModelCollection[P]>(
    prop: F
  ): [NativeModelCollection[P][F], ErrorReason] {
    return [
      nativeModels[fieldName][prop],
      makeModelErrorReason(fieldName, prop as NativeModelKey),
    ];
  };
}

const makeModelErrorReason = (
  fieldName: Field,
  modelKeyName: NativeModelKey
) => {
  return `${makeScreamingSnakeCase(fieldName)}_${makeScreamingSnakeCase(
    modelKeyName
  )}_ERROR` as ModelErrorReason;
};

const createSuccessResponse = <T extends EventName>(
  eventName: T,
  data: IOCollection[T]["output"]
): SocketResponse => ({
  data,
  errors: [],
  ok: true,
  eventName,
});

const createFailureResponse = (
  eventName: EventName,
  errors: UnknownError
): SocketResponse => ({
  data: {},
  errors: resolveResponseError(errors),
  eventName,
  ok: false,
});

export const utils = {
  ...middlewareUtils,
  ...databaseUtils,
  crashServer,
  createFailureResponse,
  createSuccessResponse,
  executeMiddlewares,
  extractClientFromCookie,
  getDefaultValidatorErrorTypes,
  isEventNameMatch,
  logEnvironments,
  makeModelErrorReason,
  makeMongoSchemaValue,
  makeScreamingSnakeCase,
  passwordGenerator,
  regexMaker,
  resolveResponseError,
  sortEnvironments,
  upperSnake,
};
