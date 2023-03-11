import { checkFields } from "check-fields";
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { errors } from "@/variables/errors";

import { IoField, SocketRoute } from "@/types";

import { arrayOfRoutes } from "@/websocket/events";

const customEmit = (socket: Socket) => {
  return (event: string, data: object, ...args: any[]) => {
    const foundRoute = arrayOfRoutes.find(
      (item) => item.name === event
    ) as SocketRoute;

    trier(customEmit.name)
      .try(tryBlock, data || {}, foundRoute.outputFields)
      .executeIfNoError(executeIfNoError, socket, event, data, ...args)
      .catch(catchBlock)
      .run();
  };
};

const tryBlock = (data: object, outputFields: IoField) => {
  checkFields(data, outputFields, errors.io.output);
};

const executeIfNoError = (
  _: unknown,
  socket: Socket,
  event: string,
  data: object,
  ...args: any[]
) => {
  socket.emit(event, { data }, ...args);
};

const catchBlock = (error: any, socket: Socket, outputFields: IoField) => {
  const unknownError = {
    ...errors.UNKNOWN_ERROR,
    checkResult: error,
  };
  const knownError = {
    ...error,
    outputFields,
  };

  const isErrorValid = !error || !error.reason;
  const sendingError = isErrorValid ? knownError : unknownError;

  socket.emit("error", sendingError);
};

export { customEmit };
