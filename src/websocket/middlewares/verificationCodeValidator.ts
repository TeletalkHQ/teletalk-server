import { trier } from "simple-trier";

import { SocketMiddleware, SocketNext } from "@/types";

import { validators } from "@/validators";

const verificationCodeValidator: SocketMiddleware = async (
  _socket,
  next,
  [_name, data]
) => {
  const { verificationCode } = data;

  await trier<void>(verificationCodeValidator.name)
    .tryAsync(tryBlock, verificationCode)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .runAsync();
};

const tryBlock = async (verificationCode: string) => {
  await validators.verificationCode(verificationCode);
};

const executeIfNoError = (_: void, next: SocketNext) => {
  next();
};

export { verificationCodeValidator };
