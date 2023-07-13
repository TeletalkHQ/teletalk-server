import { errorStore } from "~/classes/ErrorStore";
import { SocketMiddleware } from "~/types";
import { events } from "~/websocket/events";

export const checkEventAvailability: SocketMiddleware = (
  _socket,
  next,
  [eventName]
) => {
  const foundEvent = events.find((item) => item.name === eventName);

  if (!foundEvent)
    throw {
      ...errorStore.find("EVENT_NOT_FOUND"),
      eventName,
    };

  next();
};
