import { IoFields, checkFields } from "check-fields";
import { trier } from "simple-trier";

import {
  NativeError,
  SocketEvent,
  SocketMiddleware,
  SocketMiddlewareEvent,
  SocketNext,
} from "~/types";
import { checkFieldErrors } from "~/variables";
import { eventsArray } from "~/websocket/events";

export const checkDataFields: SocketMiddleware = (
  _socket,
  next,
  [name, data]
) => {
  const { inputFields } = eventsArray.find(
    (item) => item.name === name
  ) as SocketEvent;

  trier<void>(checkDataFields.name)
    .sync()
    .try(tryBlock, data, inputFields)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchBlock, inputFields)
    .run();
};

const tryBlock = (data: SocketMiddlewareEvent["1"], inputFields: IoFields) => {
  checkFields(data || {}, inputFields, checkFieldErrors.input);
};

const executeIfNoError = (_: void, next: SocketNext) => {
  next();
};

const catchBlock = (error: NativeError, inputFields: IoFields) => {
  throw {
    ...error,
    inputFields,
  };
};
