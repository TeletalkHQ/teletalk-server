import { errorThrower } from "utility-store";

import { userUtilities } from "@/classes/UserUtilities";

import { commonServices } from "@/services/common";

import { Cellphone, HydratedUserMongo, UserMongo } from "@/types";

import { errors } from "@/variables/errors";

const removeBlock = async (data: {
  currentUserId: string;
  targetUserCellphone: Cellphone;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  const { index } = checkExistenceOfBlacklistItem(
    data.targetUserCellphone,
    currentUser.blacklist
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
  targetUserCellphone: Cellphone,
  blacklist: UserMongo["blacklist"]
) => {
  const { item: blacklistItem, index } = userUtilities.findByCellphone(
    blacklist,
    targetUserCellphone
  );
  errorThrower(!blacklistItem, () => errors.BLACKLIST_ITEM_NOT_EXIST);

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
