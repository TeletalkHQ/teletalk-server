import { privateChatHandlers } from "@/websocket/events/privateChat/handlers";
import { privateChatRouter } from "@/websocket/events/privateChat/router";
import { privateChatRoutes } from "@/websocket/events/privateChat/routes";

const privateChatEvents = {
  privateChatRouter,
  privateChatRoutes,
  privateChatHandlers,
};

export { privateChatEvents };
