import { authRouter } from "@/websocket/events/auth/router";
import { otherRouter } from "@/websocket/events/other/router";
import { privateChatRouter } from "@/websocket/events/privateChat/router";
import { userRouter } from "@/websocket/events/user/router";
import { authRoutes } from "@/websocket/events/auth/routes";
import { otherRoutes } from "@/websocket/events/other/routes";
import { privateChatRoutes } from "@/websocket/events/privateChat/routes";
import { userRoutes } from "@/websocket/events/user/routes";

const routers = (socket, io) => {
  [otherRouter, authRouter, userRouter, privateChatRouter].forEach((router) =>
    router(socket, io)
  );
};

const routes = {
  ...authRoutes,
  ...otherRoutes,
  ...privateChatRoutes,
  ...userRoutes,
};

const arrayOfRoutes = Object.values(routes);

export { arrayOfRoutes, routers, routes };
