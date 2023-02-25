import { userHandlers } from "@/websocket/events/user/handlers";
import { userRouter } from "@/websocket/events/user/router";
import { userRoutes } from "@/websocket/events/user/routes";

const userEvents = {
  userHandlers,
  userRouter,
  userRoutes,
};

export { userEvents };
