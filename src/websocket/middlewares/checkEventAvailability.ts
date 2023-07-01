import { SocketMiddleware } from "~/types";
import { errors } from "~/variables";
import { events } from "~/websocket/events";

export const checkEventAvailability: SocketMiddleware = (
  _socket,
  next,
  [eventName]
) => {
  const foundEvent = events.find((item) => item.name === eventName);

  if (!foundEvent)
    throw {
      ...errors.eventNotFound,
      eventName,
    };

  next();
};
