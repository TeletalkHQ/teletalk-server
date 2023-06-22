import { customTypeof } from "custom-typeof";
import { trier } from "simple-trier";

import {
  Field,
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "~/types";
import { validators } from "~/validators";

type Data = { [prop: string]: any };

const dynamicValidator: SocketMiddleware = async (
  _socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(dynamicValidator.name)
    .async()
    .try(tryBlock, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (data: Data) => {
  await validateField(data);
  return { ok: true };
};

const validateField = async (data: Data) => {
  for (const prop in data) {
    const value = data[prop as Field];

    if (customTypeof.isObject(value)) {
      await validateField(value);
      continue;
    }

    if (customTypeof.isArray(value)) {
      for (const item of value) {
        await validateField(item);
      }
      continue;
    }

    await validators[prop as Field](value);
  }
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { dynamicValidator };
