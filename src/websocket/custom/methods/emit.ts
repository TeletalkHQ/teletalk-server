import { checkFields, IoFields } from "check-fields";
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { errors } from "@/variables/errors";

import {
  CustomEmit,
  NativeError,
  SocketResponse,
  SocketRoute,
  StringMap,
} from "@/types";

import { arrayOfRoutes } from "@/websocket/events";

const customEmit = (socket: Socket) => {
  return ((event, data) => {
    const foundRoute = arrayOfRoutes.find(
      (item) => item.name === event
    ) as SocketRoute;

    trier(customEmit.name)
      .try(tryBlock, data, foundRoute.outputFields)
      .executeIfNoError(executeIfNoError, socket, event, data)
      .catch(catchBlock, socket)
      .run();
  }) as CustomEmit;
};

const tryBlock = (data: StringMap, outputFields: IoFields) => {
  checkFields(data, outputFields, errors.io.output);
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
      data: {
        errors: {
          [error.key]: error
        }
      },
    }
    : {
      data: {
        errors: { [error.key]: errors.UNKNOWN_ERROR },
      },
      checkResult: error,
    };

  const response: SocketResponse = {
    ...sendingError,
    ok: false,
  };

  socket.emit("error", response);
};

export { customEmit };
