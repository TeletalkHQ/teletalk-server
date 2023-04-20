import { socketRouterBuilder } from "@/helpers/socketRouterBuilder";

import { privateChatRoutes } from "@/websocket/events/privateChat/routes";

const privateChatRouter = socketRouterBuilder(privateChatRoutes);

export { privateChatRouter };
