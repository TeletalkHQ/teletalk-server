import { errorThrower } from "utility-store";

import { userUtilities } from "@/classes/UserUtilities";

import { Cellphone, HydratedUserMongo, UserMongo } from "@/types";

import { commonServices } from "@/services/common";

import { errors } from "@/variables/errors";

const addBlock = async (data: {
  blockingCellphone: Cellphone;
  currentUserId: string;
}) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);

  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  const targetUser = await commonServices.findOneUser(data.blockingCellphone);
  errorThrower(!targetUser, errors.TARGET_USER_NOT_EXIST);

  checkExistenceOfBlacklistItem(data.blockingCellphone, currentUser.blacklist);

  await saveNewBlacklistItem(data.blockingCellphone, currentUser);
};

const checkExistenceOfBlacklistItem = (
  blockingCellphone: Cellphone,
  blacklist: UserMongo["blacklist"]
) => {
  const { item: isBlacklistItemExist } = userUtilities.findByCellphone(
    blacklist,
    blockingCellphone
  );
  errorThrower(isBlacklistItemExist, () => ({
    ...errors.BLACKLIST_ITEM_EXIST,
    targetUserData: blockingCellphone,
  }));
};

const saveNewBlacklistItem = async (
  blockingCellphone: Cellphone,
  currentUser: HydratedUserMongo
) => {
  currentUser.blacklist.push(blockingCellphone);
  await currentUser.save();
};

export { addBlock };
