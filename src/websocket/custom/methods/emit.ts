import { checkFields, IoFields } from "check-fields";
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { errors } from "@/variables/errors";

import { CustomEmit, NativeModelError, SocketRoute, StringMap } from "@/types";

import { arrayOfRoutes } from "@/websocket/events";

const customEmit = (socket: Socket) => {
  return ((event, data) => {
    const foundRoute = arrayOfRoutes.find(
      (item) => item.name === event
    ) as SocketRoute;

    trier(customEmit.name)
      .try(tryBlock, data, foundRoute.outputFields)
      .executeIfNoError(executeIfNoError, socket, event, data)
      .catch(catchBlock, socket, foundRoute.outputFields)
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
  socket.emit(event, { data });
};

const catchBlock = (
  error: NativeModelError,
  socket: Socket,
  outputFields: IoFields
) => {
  const isErrorValid = !error || !error.reason;

  //prettier-ignore
  const sendingError = isErrorValid
    ? {
      ...error,
      outputFields,
    }
    : {
      ...errors.UNKNOWN_ERROR,
      checkResult: error,
    };

  socket.emit("error", sendingError);
};

export { customEmit };
