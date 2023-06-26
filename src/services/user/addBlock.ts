import { errorThrower } from "utility-store";
import { UserData, UserId } from "utility-store/lib/types";

import { commonServices } from "~/services/common";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

const addBlock = async (data: {
  blockingUserId: string;
  currentUserId: UserId;
}) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);

  if (!currentUser) throw errors.currentUserNotExist;

  const targetUser = await commonServices.findOneUserById(data.blockingUserId);
  errorThrower(!targetUser, errors.targetUserNotExist);

  checkExistenceOfBlacklistItem(currentUser.blacklist, data.blockingUserId);

  await saveNewBlacklistItem(currentUser, data.blockingUserId);
};

const checkExistenceOfBlacklistItem = (
  blacklist: UserData["blacklist"],
  userId: string
) => {
  const index = blacklist.findIndex((i) => i.userId === userId);
  errorThrower(index !== -1, () => ({
    ...errors.blacklistItemExist,
    targetUserData: userId,
  }));
};

const saveNewBlacklistItem = async (
  currentUser: HydratedUser,
  userId: string
) => {
  currentUser.blacklist.push({ userId });
  await currentUser.save();
};

export { addBlock };
