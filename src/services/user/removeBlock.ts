import { errorThrower } from "utility-store";

import { commonServices } from "@/services/common";

import { BlackListItem, HydratedUserMongo, UserMongo } from "@/types";

import { errors } from "@/variables/errors";

const removeBlock = async (data: {
  currentUserId: string;
  targetBlacklistItem: BlackListItem;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  const { index } = checkExistenceOfBlacklistItem(
    currentUser.blacklist,
    data.targetBlacklistItem
  );

  await removeBlockAndSave(currentUser, index);
};

const findCurrentUser = async (currentUserId: string) => {
  return await commonServices.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const checkExistenceOfBlacklistItem = (
  blacklist: UserMongo["blacklist"],
  targetBlacklistItem: BlackListItem
) => {
  const index = blacklist.findIndex(
    (i) => i.userId === targetBlacklistItem.userId
  );
  errorThrower(index === -1, () => errors.BLACKLIST_ITEM_NOT_EXIST);

  return { index };
};

const removeBlockAndSave = async (
  currentUser: HydratedUserMongo,
  index: number
) => {
  currentUser.blacklist.splice(index, 1);
  await currentUser.save();
};

export { removeBlock };
