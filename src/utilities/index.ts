//@ts-ignore
import generatePassword from "generate-password";
import lodash from "lodash";
import { Socket } from "socket.io";

import { envManager } from "~/classes/EnvironmentManager";
import {
  Environments,
  ErrorCollection,
  ErrorReason,
  Field,
  ModelErrorReason,
  NativeModelKey,
  SocketEvent,
  SocketMiddleware,
  SocketNext,
} from "~/types";

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (prevValue as any)[currentValue.prop] = value;

      return prevValue;
    }, {} as Environments);

const extractClientFromCookie = (cookie: string) => {
  const [rawCookie] = cookie.split("; ");
  return rawCookie.split("=")[1];
};

const findError = <M extends NativeModelKey>(
  errors: ErrorCollection,
  fieldName: Field,
  modelKeyName: M
) => {
  return errors[makeModelErrorReason(fieldName, modelKeyName) as ErrorReason];
};

const makeModelErrorReason = (
  fieldName: Field,
  modelKeyName: NativeModelKey
) => {
  return `${fieldName}_${modelKeyName}_error` as ModelErrorReason;
};

const upperSnake = (str: string) => lodash.snakeCase(str).toUpperCase();

const utilities = {
  crashServer,
  executeMiddlewares,
  extractClientFromCookie,
  findError,
  isEventNameMatch,
  logEnvironments,
  makeModelErrorReason,
  passwordGenerator,
  regexMaker,
  sortEnvironments,
  upperSnake,
};

export { utilities };
