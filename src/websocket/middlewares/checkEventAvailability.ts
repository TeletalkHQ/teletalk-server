import { customTypeof } from "custom-typeof";

import { errors } from "@/variables/errors";

import { arrayOfRoutes } from "@/websocket/events";
import { errorThrower } from "utility-store";

const checkEventAvailability = (_socket, next, [name]) => {
  const foundEvent = arrayOfRoutes.find((item) => item.name === name);

  errorThrower(isEventInvalid(foundEvent), {
    ...errors.EVENT_NOT_FOUND,
    event: name,
  });

  next();
};

const isEventInvalid = ({
  inputFields,
  method,
  name,
  outputFields,
  statusCode,
} = {}) =>
  customTypeof.isUndefined(inputFields, method, name, outputFields, statusCode);

export { checkEventAvailability };
