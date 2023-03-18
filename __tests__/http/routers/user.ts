import { Router } from "express";

import { controllers } from "@/http/controllers";

import { routes } from "$/http/routes";

const userRouter = Router();

userRouter[routes.getAllUsers.method](
  routes.test.getAllUsers.url,
  controllers.getAllUsers
);

export { userRouter };
