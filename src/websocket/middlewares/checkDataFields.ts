import { checkFields, IoFields } from "check-fields";
import { trier } from "simple-trier";

import {
  NativeError,
  SocketEvent,
  SocketMiddleware,
  SocketNext,
  SocketRoute,
} from "@/types";

import { checkFieldErrors } from "@/variables";

import { arrayOfRoutes } from "@/websocket/events";

const checkDataFields: SocketMiddleware = (_socket, next, [name, data]) => {
  const { inputFields } = arrayOfRoutes.find(
    (item) => item.name === name
  ) as SocketRoute;

  trier<void>(checkDataFields.name)
    .try(tryBlock, data, inputFields)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchBlock, inputFields)
    .run();
};

const tryBlock = (data: SocketEvent["1"], inputFields: IoFields) => {
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

export { checkDataFields };
