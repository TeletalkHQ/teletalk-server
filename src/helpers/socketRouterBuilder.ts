import { Socket } from "socket.io";

import { SocketRoute } from "@/types";

type Routes = {
  [prop: string]: SocketRoute;
};

const socketRouterBuilder = (routes: Routes) => (socket: Socket) =>
  Object.values(routes).forEach((item) => {
    socket["customOn"](item.name, item.handler);
  });

export { socketRouterBuilder };
