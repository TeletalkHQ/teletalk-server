import { errorStore } from "~/classes/ErrorStore";
import { events } from "~/socket/events";
import { SocketMiddleware } from "~/types";

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
