import { socketRouterBuilder } from "@/helpers/socketRouterBuilder";

import { userRoutes } from "@/websocket/events/user/routes";

const userRouter = socketRouterBuilder(userRoutes);

export { userRouter };
