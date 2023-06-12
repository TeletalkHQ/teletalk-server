/* eslint-disable indent */
import { checkFields, IoFields } from "check-fields";
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { errors } from "~/variables";

import {
  CustomEmit,
  NativeError,
  SocketResponse,
  SocketRoute,
  StringMap,
} from "~/types";

import { checkFieldErrors } from "~/variables";

import { arrayOfRoutes } from "~/websocket/events";

const registerCustomEmit = (socket: Socket) => {
  return ((event, data) => {
    const foundRoute = arrayOfRoutes.find(
      (item) => item.name === event
    ) as SocketRoute;

    trier("socket.customEmit")
      .sync()
      .try(tryBlock, data, foundRoute.outputFields)
      .executeIfNoError(executeIfNoError, socket, event, data)
      .catch(catchBlock, socket)
      .run();
  }) as CustomEmit;
};

const tryBlock = (data: StringMap, outputFields: IoFields) => {
  checkFields(data, outputFields, checkFieldErrors.output);
};

const executeIfNoError = (
  _: unknown,
  socket: Socket,
  event: string,
  data: StringMap
) => {
  const response: SocketResponse = { data, ok: true };
  socket.emit(event, response);
};

const catchBlock = (error: NativeError, socket: Socket) => {
  const isErrorValid = !error || !error.reason;

  //prettier-ignore
  const sendingError = isErrorValid
    ? {
        data: {},
        errors: {
          [error.reason]: error,
        },
      }
    : {
        data: {},
        errors: { [error.reason]: errors.unknownError },
        checkResult: error,
      };

  const response: SocketResponse = {
    ...sendingError,
    ok: false,
  };

  socket.emit("error", response);
};

export { registerCustomEmit };
