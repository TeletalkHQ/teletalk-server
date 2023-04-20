import { randomMaker } from "$/classes/RandomMaker";
import { socketRouteBuilder } from "@/classes/routeBuilder/SocketRouteBuilder";

const unknownRoute = socketRouteBuilder()
  .create()
  .name(randomMaker.string(10))
  .build();

const otherRoutes = { unknownRoute };

export { otherRoutes };
