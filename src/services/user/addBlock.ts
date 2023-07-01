import { errorThrower } from "utility-store";
import { UserData, UserId } from "utility-store/lib/types";

import { UserService } from "~/types";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

import { findOneUserById } from "./findOneUserById";

export const addBlock: UserService<
  {
    blockingUserId: UserId;
    currentUserId: UserId;
  },
  void
> = async (data) => {
  const currentUser = await findOneUserById({
    userId: data.currentUserId,
  });

  if (!currentUser) throw errors.currentUserNotExist;

  const targetUser = await findOneUserById({
    userId: data.blockingUserId,
  });
  errorThrower(!targetUser, errors.targetUserNotExist);

  checkExistenceOfBlacklistItem(currentUser.blacklist, data.blockingUserId);

  await saveNewBlacklistItem(currentUser, data.blockingUserId);
};

const checkExistenceOfBlacklistItem = (
  blacklist: UserData["blacklist"],
  userId: UserId
) => {
  const index = blacklist.findIndex((i) => i.userId === userId);
  errorThrower(index !== -1, () => ({
    ...errors.blacklistItemExist,
    targetUserData: userId,
  }));
};

const saveNewBlacklistItem = async (
  currentUser: HydratedUser,
  userId: UserId
) => {
  currentUser.blacklist.push({ userId });
  await currentUser.save();
};
