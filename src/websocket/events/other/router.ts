import { socketRouterBuilder } from "@/helpers/socketRouterBuilder";

import { otherRoutes } from "@/websocket/events/other/routes";

const otherRouter = socketRouterBuilder(otherRoutes);

export { otherRouter };
