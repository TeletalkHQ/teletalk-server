import { controllerBuilder } from "@/classes/ControllerBuilder";

import { services } from "@/services";

const tryToGetAllUsers = async () => {
  const users = await services.getAllUsers().run();
  return { users };
};

const getAllUsers = controllerBuilder.create().body(tryToGetAllUsers).build();

export { getAllUsers };
