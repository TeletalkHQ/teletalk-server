import { errorThrower } from "utility-store";

import { userUtilities } from "@/classes/UserUtilities";
import { serviceBuilder } from "@/classes/service/ServiceBuilder";
import { serviceHelper } from "@/classes/service/ServiceHelper";

import { errors } from "@/variables/errors";

const removeBlock = serviceBuilder
  .create()
  .body(async ({ currentUserId, targetUserData }) => {
    const currentUser = await findCurrentUser(currentUserId);

    const { index } = checkExistenceOfBlacklistItem(
      currentUser.blacklist,
      targetUserData
    );

    await removeBlockAndSave(currentUser, index);
  })
  .build();

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const checkExistenceOfBlacklistItem = (blacklist, targetUserData) => {
  const { item: blacklistItem, index } = userUtilities.findByCellphone(
    blacklist,
    targetUserData
  );
  errorThrower(!blacklistItem, () => errors.BLACKLIST_ITEM_NOT_EXIST);

  return { index };
};

const removeBlockAndSave = async (currentUser, index) => {
  currentUser.blacklist.splice(index, 1);
  await currentUser.save();
};

export { removeBlock };
