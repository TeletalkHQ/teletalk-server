import { errorThrower } from "utility-store";
import { UserData, UserId } from "utility-store/lib/types";

import { commonServices } from "~/services/common";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

const removeBlock = async (data: {
  currentUserId: UserId;
  targetUserId: UserId;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.currentUserNotExist;

  const { index } = checkExistenceOfBlacklistItem(
    currentUser.blacklist,
    data.targetUserId
  );

  await removeBlockAndSave(currentUser, index);
};

const findCurrentUser = async (currentUserId: string) => {
  return await commonServices.findOneUserById(
    currentUserId,
    errors.currentUserNotExist
  );
};

const checkExistenceOfBlacklistItem = (
  blacklist: UserData["blacklist"],
  targetUserId: UserId
) => {
  const index = blacklist.findIndex((i) => i.userId === targetUserId);
  errorThrower(index === -1, () => errors.blacklistItemNotExist);

  return { index };
};

const removeBlockAndSave = async (currentUser: HydratedUser, index: number) => {
  currentUser.blacklist.splice(index, 1);
  await currentUser.save();
};

export { removeBlock };
