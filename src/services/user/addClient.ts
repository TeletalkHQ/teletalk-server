import { UserService } from "~/types";
import { ClientId, UserId } from "~/types/datatypes";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

import { findOneUser } from "./findOneUser";

export const addClient: UserService<
  {
    clientId: ClientId;
    userId: UserId;
  },
  void
> = async (data) => {
  const currentUser = await findCurrentUser(data.userId);
  if (!currentUser) throw errors.currentUserNotExist;

  await addAndSaveNew(currentUser, data.clientId);
};

const findCurrentUser = (userId: UserId) => {
  return findOneUser({
    userId,
  });
};

const addAndSaveNew = async (currentUser: HydratedUser, clientId: ClientId) => {
  currentUser.clients.push({
    clientId,
  });

  await currentUser.save();
};
