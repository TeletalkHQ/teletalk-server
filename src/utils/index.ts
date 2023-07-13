import generatePassword from "generate-password";
import lodash from "lodash";
import { Socket } from "socket.io";
import { ScreamingSnakeCase } from "type-fest";

import { envManager } from "~/classes/EnvironmentManager";
import {
  Environments,
  EventName,
  SocketMiddleware,
  SocketMiddlewareEvent,
  SocketNext,
} from "~/types";
import { Field, ModelErrorReason, NativeModelKey } from "~/types/models";

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

const makeModelErrorReason = (
  fieldName: Field,
  modelKeyName: NativeModelKey
) => {
  return `${makeScreamingSnakeCase(fieldName)}_${makeScreamingSnakeCase(
    modelKeyName
  )}_ERROR` as ModelErrorReason;
};

const makeScreamingSnakeCase = <T extends string>(value: T) =>
  lodash.snakeCase(value).toUpperCase() as ScreamingSnakeCase<T>;

const upperSnake = (str: string) => lodash.snakeCase(str).toUpperCase();

export const utils = {
  crashServer,
  executeMiddlewares,
  extractClientFromCookie,
  isEventNameMatch,
  logEnvironments,
  makeModelErrorReason,
  makeScreamingSnakeCase,
  passwordGenerator,
  regexMaker,
  sortEnvironments,
  upperSnake,
};
