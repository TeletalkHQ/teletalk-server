import { Socket } from "socket.io";

import { SocketRouteCollection } from "~/types";
import { authEvents } from "~/websocket/events/auth";
import { otherEvents } from "~/websocket/events/other";
import { privateChatEvents } from "~/websocket/events/privateChat";
import { userEvents } from "~/websocket/events/user";

const routes: SocketRouteCollection = {
  ...authEvents.routes,
  ...otherEvents.routes,
  ...privateChatEvents.routes,
  ...userEvents.routes,
};

const arrayOfRoutes = Object.values(routes);

const registerEvents = (socket: Socket) => {
  arrayOfRoutes.forEach((item) => {
    socket.customOn(item.name, item.handler);
  });
};

const routesWithoutAuth = arrayOfRoutes.filter(
  (i) => i.isAuthRequired === false
);

const routesWithAuth = arrayOfRoutes.filter((i) => i.isAuthRequired === true);

export {
  arrayOfRoutes,
  routesWithoutAuth,
  registerEvents,
  routes,
  routesWithAuth,
};
