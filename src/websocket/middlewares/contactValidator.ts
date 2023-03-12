import { trier } from "simple-trier";

import { userUtilities } from "@/classes/UserUtilities";

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

const tryBlock = async (data: Contact & object) => {
  const { firstName, lastName } = data;
  await validators.contact({
    ...userUtilities.extractCellphone(data),
    firstName,
    lastName,
  });
  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { contactValidator };
