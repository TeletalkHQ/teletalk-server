import { checkFields } from "check-fields";
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { helpers } from "~/helpers";
import {
  CustomOn,
  EventName,
  NativeError,
  ResponseCallback,
  SocketHandlerReturnValue,
  SocketOnHandler,
  SocketResponse,
  StringMap,
} from "~/types";
import { checkFieldErrors } from "~/variables";
import { eventsArray } from "~/websocket/events";

const registerCustomOn = (socket: Socket) => {
  return ((eventName, handler) => {
    socket.on(eventName, async (data, responseCallback: ResponseCallback) => {
      const returnValue = await tryToRunHandler(
        handler,
        socket,
        data,
        eventName,
        responseCallback
      );

      //REFACTOR: Almost all events need to fix before enabling this feature
      // tryToCheckOutputFields(socket, eventName, returnValue.data, responseCallback);

      // await tryToEmitReturnValue(
      //   socket,
      //   eventName,
      //   returnValue || { data: {} },
      //   responseCallback
      // );

      if (typeof responseCallback === "function") {
        const response: SocketResponse = {
          data: returnValue?.data || {},
          ok: true,
          errors: [],
        };

        responseCallback(response);
      }
    });
  }) as CustomOn;
};

export { registerCustomOn };

async function tryToRunHandler(
  handler: SocketOnHandler,
  socket: Socket,
  data: StringMap,
  eventName: EventName,
  responseCallback: ResponseCallback
): Promise<void | SocketHandlerReturnValue> {
  return await trier<void | SocketHandlerReturnValue>(tryToRunHandler.name)
    .async()
    .try(async () => {
      return await handler(socket, data);
    })
    .catch(catchBlock, socket, eventName, responseCallback)
    .run();
}

function _tryToCheckOutputFields(
  socket: Socket,
  eventName: string,
  outputData: StringMap,
  responseCallback: ResponseCallback
) {
  trier(_tryToCheckOutputFields.name)
    .sync()
    .try(() => {
      const foundEvent = eventsArray.find((item) => item.name === eventName)!;
      checkFields(outputData, foundEvent.outputFields, checkFieldErrors.output);
    })
    .catch(catchBlock, socket, responseCallback)
    .run();
}

async function _tryToEmitReturnValue(
  socket: Socket,
  eventName: EventName,
  returnValue: SocketHandlerReturnValue,
  responseCallback: ResponseCallback
) {
  await trier(_tryToEmitReturnValue.name)
    .async()
    .try(async () => {
      socket.customEmit(eventName, returnValue.data);
    })
    .catch(catchBlock, socket, eventName, responseCallback)
    .run();
}

const catchBlock = (
  error: NativeError | NativeError[] | undefined,
  socket: Socket,
  eventName: EventName,
  responseCallback: ResponseCallback
) => {
  const response: SocketResponse = {
    data: {},
    errors: helpers.resolveResponseError(error),
    ok: false,
  };

  logger.debug(`customOn:catchBlock:${eventName}`, error);

  if (typeof responseCallback === "function") responseCallback(response);

  socket.emit("error", response);
};
