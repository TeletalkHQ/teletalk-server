import { SocketMiddleware } from "~/types";
import { errors } from "~/variables";
import { eventsArray } from "~/websocket/events";

const checkEventAvailability: SocketMiddleware = (
  _socket,
  next,
  [eventName]
) => {
  const foundEvent = eventsArray.find((item) => item.name === eventName);

  if (!foundEvent)
    throw {
      ...errors.eventNotFound,
      eventName,
    };

  next();
};

export { checkEventAvailability };
