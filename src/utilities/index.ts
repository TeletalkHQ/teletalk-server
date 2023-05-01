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
  return `${upperSnake(fieldName)}_${upperSnake(
    modelKeyName
  )}_ERROR` as ErrorReason;
};

const upperSnake = (str: string) => lodash.snakeCase(str).toUpperCase();

const utilities = {
  crashServer,
  executeMiddlewares,
  extractClientIdFromCookie,
  findError,
  isEventNameMatch,
  logEnvironments,
  makeErrorReason,
  passwordGenerator,
  regexMaker,
  sortEnvironments,
  upperSnake,
};

export { utilities };
