import { Socket } from "socket.io";

import { authRouter } from "@/websocket/events/auth/router";
import { authRoutes } from "@/websocket/events/auth/routes";
import { otherRouter } from "@/websocket/events/other/router";
import { otherRoutes } from "@/websocket/events/other/routes";
import { privateChatRouter } from "@/websocket/events/privateChat/router";
import { privateChatRoutes } from "@/websocket/events/privateChat/routes";
import { userRouter } from "@/websocket/events/user/router";
import { userRoutes } from "@/websocket/events/user/routes";

const routers = (socket: Socket) => {
  [otherRouter, authRouter, userRouter, privateChatRouter].forEach((router) =>
    router(socket)
  );
};

const routes = {
  ...authRoutes,
  ...otherRoutes,
  ...privateChatRoutes,
  ...userRoutes,
};

const ignoredRoutesForAuth = [
  routes.getCountries,
  routes.getStuff,
  routes.getWelcomeMessage,
  routes.signIn,
];

const arrayOfRoutes = Object.values(routes);

export { arrayOfRoutes, ignoredRoutesForAuth, routers, routes };
