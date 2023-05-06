import { SocketMiddleware } from "@/types";

import { errors } from "@/variables";

import { arrayOfRoutes } from "@/websocket/events";

const checkEventAvailability: SocketMiddleware = (_socket, next, [name]) => {
  const foundEvent = arrayOfRoutes.find((item) => item.name === name);

  if (!foundEvent)
    throw {
      ...errors.eventNotFound,
      event: name,
    };

  next();
};

export { checkEventAvailability };
