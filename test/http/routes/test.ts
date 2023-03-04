import { randomMaker } from "utility-store";

import { httpRouteBuilder } from "@/classes/routeBuilder/HttpRouteBuilder";

const unknownRoute = httpRouteBuilder(`/${randomMaker.string(10)}`)
  .create()
  .url(`/${randomMaker.string(10)}`)
  .statusCode(404)
  .build();

const test = { unknownRoute };

export { test };
