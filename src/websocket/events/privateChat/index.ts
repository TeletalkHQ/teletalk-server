import { privateChatHandlers } from "@/websocket/events/privateChat/handlers";
import { privateChatRoutes } from "@/websocket/events/privateChat/routes";

const privateChatEvents = {
  privateChatHandlers,
  privateChatRoutes,
};

export { privateChatEvents };
