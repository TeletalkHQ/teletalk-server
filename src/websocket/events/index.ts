import { Socket } from "socket.io";

import { SocketRouteCollection } from "@/types";

import { authRoutes } from "@/websocket/events/auth/routes";
import { otherRoutes } from "@/websocket/events/other/routes";
import { privateChatRoutes } from "@/websocket/events/privateChat/routes";
import { userRoutes } from "@/websocket/events/user/routes";

const routes: SocketRouteCollection = {
  ...authRoutes,
  ...otherRoutes,
  ...privateChatRoutes,
  ...userRoutes,
};

const arrayOfRoutes = Object.values(routes);

const registerRoutes = (socket: Socket) => {
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
  registerRoutes,
  routes,
  routesWithAuth,
};
