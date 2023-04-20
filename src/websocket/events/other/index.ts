import { otherHandlers } from "@/websocket/events/other/handlers";
import { otherRouter } from "@/websocket/events/other/router";
import { otherRoutes } from "@/websocket/events/other/routes";

const otherEvents = { otherRouter, otherRoutes, otherHandlers };

export { otherEvents };
