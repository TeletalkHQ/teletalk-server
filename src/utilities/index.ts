import generatePassword from "generate-password";
import { isArray } from "lodash";
import { Socket } from "socket.io";

import { envManager } from "@/classes/EnvironmentManager";

import {
  Environments,
  SocketEvent,
  SocketMiddleware,
  SocketNext,
} from "@/types";

// const getHostFromRequest = (request) => request.get("host");

type Url = string | string[];
const isUrlMatchWithReqUrl = (url: Url, reqUrl: string) =>
  (isArray(url) && url.some((u) => u === reqUrl)) || url === reqUrl;

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
    const result = await m(socket, next, event);

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
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce((prevValue, currentValue) => {
      type Key = keyof Environments;
      const key = currentValue.key as Key;
      const value = currentValue.value as Environments[Key];
      (prevValue as any)[key] = value;

      return prevValue;
    }, {} as Environments);

const utilities = {
  crashServer,
  executeMiddlewares,
  isUrlMatchWithReqUrl,
  logEnvironments,
  passwordGenerator,
  regexMaker,
  sortEnvironments,
};

export { utilities };
