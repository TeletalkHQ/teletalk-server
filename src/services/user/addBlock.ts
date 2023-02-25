import { errorThrower } from "utility-store/src/utilities/utilities";

import { serviceBuilder } from "@/classes/service/ServiceBuilder";
import { serviceHelper } from "@/classes/service/ServiceHelper";
import { userUtilities } from "@/classes/UserUtilities";

import { commonServices } from "@/services/common";

import { errors } from "@/variables/errors";

const addBlock = serviceBuilder
  .create()
  .body(async ({ currentUserId, blockingCellphone }) => {
    const currentUser = await commonServices.findOneUserById(currentUserId);

    await serviceHelper.findOneUser(
      blockingCellphone,
      errors.TARGET_USER_NOT_EXIST
    );

    checkExistenceOfBlacklistItem(currentUser.blacklist, blockingCellphone);

    const blacklistItem = userUtilities.extractCellphone(blockingCellphone);

    await saveNewBlacklistItem(blacklistItem, currentUser);
  })
  .build();

const checkExistenceOfBlacklistItem = (blacklist, blockingCellphone) => {
  const { item: isBlacklistItemExist } = userUtilities.findByCellphone(
    blacklist,
    blockingCellphone
  );
  errorThrower(isBlacklistItemExist, () => ({
    ...errors.BLACKLIST_ITEM_EXIST,
    targetUserData: blockingCellphone,
  }));
};

const saveNewBlacklistItem = async (blacklistItem, currentUser) => {
  currentUser.blacklist.push(blacklistItem);
  await currentUser.save();
};

export { addBlock };
