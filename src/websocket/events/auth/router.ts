import { socketRouterBuilder } from "@/helpers/socketRouterBuilder";

import { authRoutes } from "@/websocket/events/auth/routes";

const authRouter = socketRouterBuilder(authRoutes);

export { authRouter };
