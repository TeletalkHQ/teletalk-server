import { Socket } from "socket.io";

import { auth } from "~/websocket/events/auth";
import { other } from "~/websocket/events/other";
import { privateChat } from "~/websocket/events/privateChat";
import { user } from "~/websocket/events/user";

export const events = {
  ...auth.events,
  ...other.events,
  ...privateChat.events,
  ...user.events,
};

export const eventsArray = Object.values(events);

export const registerEvents = (socket: Socket) => {
  eventsArray.forEach((item) => {
    socket.customOn(item.name, item.handler);
  });
};

export const eventsWithoutAuth = eventsArray.filter(
  (i) => i.isAuthRequired === false
);

export const eventsWithAuth = eventsArray.filter(
  (i) => i.isAuthRequired === true
);
