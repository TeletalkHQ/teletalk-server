import { checkFields } from "check-fields";
import { Socket } from "socket.io";
import { trier } from "simple-trier";

import {
  ClientCallback,
  CustomOn,
  NativeError,
  SocketHandlerReturnValue,
  SocketOnHandler,
  SocketResponse,
  StringMap,
} from "~/types";

import { checkFieldErrors, errors } from "~/variables";

import { arrayOfRoutes } from "~/websocket/events";

const registerCustomOn = (socket: Socket) => {
  return ((eventName, handler) => {
    socket.on(eventName, async (data: StringMap, cb: ClientCallback) => {
      const returnValue = await tryToRunHandler(handler, socket, data, cb);

      //REFACTOR: Almost all events need to fix before enabling this feature
      // tryToCheckOutputFields(socket, eventName, returnValue.data, cb);

      await tryToEmitReturnValue(socket, eventName, returnValue, cb);

      if (returnValue && typeof cb === "function")
        cb({ data: returnValue.data, ok: true });
    });
  }) as CustomOn;
};

export { registerCustomOn };

async function tryToRunHandler(
  handler: SocketOnHandler,
  socket: Socket,
  data: StringMap,
  cb: ClientCallback
) {
  return await trier<void | SocketHandlerReturnValue>(tryToRunHandler.name)
    .async()
    .try(async () => {
      return await handler(socket, data);
    })
    .catch(catchBlock, socket, cb)
    .run();
}

function tryToCheckOutputFields(
  socket: Socket,
  eventName: string,
  outputData: StringMap,
  cb: ClientCallback
) {
  trier(tryToCheckOutputFields.name)
    .sync()
    .try(() => {
      const foundRoute = arrayOfRoutes.find((item) => item.name === eventName)!;
      checkFields(outputData, foundRoute.outputFields, checkFieldErrors.output);
    })
    .catch(catchBlock, socket, cb)
    .run();
}

async function tryToEmitReturnValue(
  socket: Socket,
  eventName: string,
  returnValue: SocketHandlerReturnValue,
  cb: ClientCallback
) {
  await trier(tryToEmitReturnValue.name)
    .async()
    .try(async () => {
      socket.customEmit(eventName, returnValue.data);
    })
    .catch(catchBlock, socket, cb)
    .run();
}

const catchBlock = (
  error: NativeError | undefined,
  socket: Socket,
  cb: ClientCallback
) => {
  const errorResponse = makeErrorResponse(error);

  logger.debug("customOn:catchBlock:::", error);

  socket.emit("error", errorResponse);
  if (typeof cb === "function") cb(errorResponse);
};

const makeErrorResponse = (error: NativeError | undefined): SocketResponse => {
  return {
    data: {},
    //prettier-ignore
    errors: error?.reason
      ? {
        [error.reason]: error,
      }
      : { [errors.unknownError.reason]: errors.unknownError },
    ok: false,
  };
};
