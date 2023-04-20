import { trier } from "simple-trier";

import { validators } from "@/validators";
import {
  Contact,
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "@/types";

const contactValidator: SocketMiddleware = async (
  _socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(contactValidator.name)
    .tryAsync(tryBlock, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .runAsync();
};

const tryBlock = async (data: Contact) => {
  await validators.contact(data);
  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { contactValidator };
