import { UserService } from "~/types";
import { UserId } from "~/types/datatypes";
import { HydratedUser } from "~/types/models";

import { findOneUser } from "./findOneUser";

export const findOneUserById: UserService<
  {
    userId: UserId;
  },
  HydratedUser | null
> = (data, projection, options) => {
  return findOneUser(data, projection, options);
};
