import { checkFields } from "check-fields";
import { trier } from "simple-trier";
import { errorThrower } from "utility-store";

import { errors } from "@/variables/errors";

import { arrayOfRoutes } from "@/websocket/events";

const customEmit = (socket) => {
  return (event, data, ...args) => {
    const foundRoute = arrayOfRoutes.find((item) => item.name === event);

    return trier(customEmit.name)
      .try(tryBlock, data || {}, foundRoute.outputFields)
      .executeIfNoError(executeIfNoError, socket, event, data, ...args)
      .catch(catchBlock)
      .run();
  };
};

const tryBlock = (data, inputFields) => {
  const checkResult = checkFields(data, inputFields, errors.io.output);

  if (checkResult.ok === false) {
    errorThrower(!checkResult.error || !checkResult.error.reason, {
      ...errors.UNKNOWN_ERROR,
      checkResult,
    });

    throw {
      ...checkResult.error,
      inputFields,
    };
  }
};

const executeIfNoError = (_, socket, event, data, ...args) => {
  socket.emit(event, { data }, ...args);
};

const catchBlock = (error, socket) => {
  socket.emit("error", error);
};

export { customEmit };
