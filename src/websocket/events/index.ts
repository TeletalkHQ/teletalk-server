import { Socket } from "socket.io";

import { auth } from "~/websocket/events/auth";
import { other } from "~/websocket/events/other";
import { privateChat } from "~/websocket/events/privateChat";
import { user } from "~/websocket/events/user";

const events = {
  ...auth.events,
  ...other.events,
  ...privateChat.events,
  ...user.events,
};

const eventsArray = Object.values(events);

const registerEvents = (socket: Socket) => {
  eventsArray.forEach((item) => {
    socket.customOn(item.name, item.handler);
  });
};

const eventsWithoutAuth = eventsArray.filter((i) => i.isAuthRequired === false);

const eventsWithAuth = eventsArray.filter((i) => i.isAuthRequired === true);

export {
  events,
  eventsArray,
  eventsWithAuth,
  eventsWithoutAuth,
  registerEvents,
};
