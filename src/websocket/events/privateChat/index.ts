import { privateChatHandlers } from "~/websocket/events/privateChat/handlers";
import { privateChatRoutes } from "~/websocket/events/privateChat/routes";

const privateChatEvents = {
  handlers: privateChatHandlers,
  routes: privateChatRoutes,
};

export { privateChatEvents };
