import { IoFields, checkFields } from "check-fields";
import { trier } from "simple-trier";

import { events } from "~/socket/events";
import {
  NativeError,
  SocketEvent,
  SocketMiddleware,
  SocketMiddlewareEvent,
  SocketNext,
} from "~/types";
import { errors } from "~/variables";

export const checkDataFields: SocketMiddleware = (
  _socket,
  next,
  [name, data]
) => {
  const { inputFields } = events.find(
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
  checkFields(data || {}, inputFields, errors.checkField.input);
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
