import generatePassword from "generate-password";
import { isArray } from "lodash";

import { envManager } from "@/classes/EnvironmentManager";

import { Environments } from "@/types";

// const getHostFromRequest = (request) => request.get("host");

type Url = string | string[];
const isUrlMatchWithReqUrl = (url: Url, reqUrl: string) =>
  (isArray(url) && url.some((u) => u === reqUrl)) || url === reqUrl;

const crashServer = (message: unknown) => {
  logger.error(message);
  process.exit(1);
};

// const executeMiddlewares = async ({ middlewares, next, req, res }) => {
//   for await (const m of middlewares) {
//     const result = await m(req, res, () => logger.debug("middleware executed"));

//     if (result.ok === false) {
//       return;
//     }
//   }

//   return next();
// };

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

const sortEnvironments = (): Environments =>
  Object.entries(envManager.getEnvironment())
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce((prevValue, currentValue) => {
      const key = currentValue.key as keyof Environments;

      (prevValue as any)[key] = currentValue.value;
      return prevValue;
    }, {} as Environments);

const utilities = {
  crashServer,
  // executeMiddlewares,
  isUrlMatchWithReqUrl,
  logEnvironments,
  regexMaker,
  sortEnvironments,
};

export { utilities };
