import { trier } from "simple-trier";

import { userUtilities } from "@/classes/UserUtilities";

import { SocketMiddleware, SocketNext } from "@/types";

import { validators } from "@/validators";
import { ExtendedCellphone } from "utility-store/lib/types";

const cellphoneValidator: SocketMiddleware = async (
  _socket,
  next,
  [_name, data]
) => {
  await trier(cellphoneValidator.name)
    .tryAsync(tryBlock, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .runAsync();
};

const tryBlock = async (data: ExtendedCellphone) => {
  const cellphone = userUtilities.extractCellphone(data);
  await validators.cellphone(cellphone);
  return { ok: true };
};

const executeIfNoError = (_: unknown, next: SocketNext) => {
  next();
};

export { cellphoneValidator };
