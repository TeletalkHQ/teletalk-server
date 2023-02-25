import { httpRouteBuilder } from "@/classes/routeBuilder/HttpRouteBuilder";

import { baseUrls } from "$/http/routes/baseUrls";

import { METHODS } from "@/variables/others/methods";

const userRouteBuilder = httpRouteBuilder(baseUrls.user);

const getAllUsers = userRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getAllUsers")
  .build();

const userRoutes = {
  getAllUsers,
};

export {
  user: userRoutes,
};
