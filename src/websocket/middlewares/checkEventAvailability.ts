import { SocketMiddleware } from "@/types";

import { errors } from "@/variables/errors";

import { arrayOfRoutes } from "@/websocket/events";

const checkEventAvailability: SocketMiddleware = (_socket, next, [name]) => {
  const foundEvent = arrayOfRoutes.find((item) => item.name === name);

  if (!foundEvent)
    throw {
      ...errors.EVENT_NOT_FOUND,
      event: name,
    };

  next();
};

export { checkEventAvailability };
