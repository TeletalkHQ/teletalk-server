import { errorThrower } from "utility-store";

import { HydratedUserMongo, UserMongo } from "@/types";

import { commonServices } from "@/services/common";

import { ERRORS } from "@/variables";

const addBlock = async (data: {
  blockingUserId: string;
  currentUserId: string;
}) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);

  if (!currentUser) throw ERRORS.CURRENT_USER_NOT_EXIST;

  const targetUser = await commonServices.findOneUserById(data.blockingUserId);
  errorThrower(!targetUser, ERRORS.TARGET_USER_NOT_EXIST);

  checkExistenceOfBlacklistItem(currentUser.blacklist, data.blockingUserId);

  await saveNewBlacklistItem(currentUser, data.blockingUserId);
};

const checkExistenceOfBlacklistItem = (
  blacklist: UserMongo["blacklist"],
  userId: string
) => {
  const index = blacklist.findIndex((i) => i.userId === userId);
  errorThrower(index !== -1, () => ({
    ...ERRORS.BLACKLIST_ITEM_EXIST,
    targetUserData: userId,
  }));
};

const saveNewBlacklistItem = async (
  currentUser: HydratedUserMongo,
  userId: string
) => {
  currentUser.blacklist.push({ userId });
  await currentUser.save();
};

export { addBlock };
