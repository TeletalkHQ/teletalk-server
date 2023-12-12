import { Socket } from "socket.io";

import { auth } from "~/socket/events/auth";
import { other } from "~/socket/events/other";
import { privateChat } from "~/socket/events/privateChat";
import { user } from "~/socket/events/user";

export const events = [
  ...auth.events,
  ...other.events,
  ...privateChat.events,
  ...user.events,
];

export const registerEvents = (socket: Socket) => {
  events.forEach((item) => {
    socket.customOn(item.name, item.handler);
  });
};

export const eventsWithoutAuth = events.filter(
  (i) => i.isAuthRequired === false
);

export const eventsWithoutAuthAndDisconnect = eventsWithoutAuth.filter(
  (i) => i.name !== "disconnect"
);

export const eventsWithAuth = events.filter((i) => i.isAuthRequired === true);
