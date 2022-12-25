const { errorThrower } = require("utility-store/src/functions/utilities");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const addBlock = serviceBuilder
  .create()
  .body(async ({ currentUserId, blockingCellphone }) => {
    const currentUser = await commonServices.findOneUserById(currentUserId);

    await serviceHelper.findOneUser(
      blockingCellphone,
      errors.TARGET_USER_NOT_EXIST
    );

    checkExistenceOfBlacklistItem(currentUser.blacklist, blockingCellphone);

    const blacklistItem =
      userPropsUtilities.extractCellphone(blockingCellphone);

    await saveNewBlacklistItem(blacklistItem, currentUser);
  })
  .build();

const checkExistenceOfBlacklistItem = (blacklist, blockingCellphone) => {
  const isBlacklistItemExist = !!userPropsUtilities.cellphoneFinder(
    blacklist,
    blockingCellphone
  ).cellphone;
  errorThrower(isBlacklistItemExist, () => ({
    ...errors.BLACKLIST_ITEM_EXIST,
    targetUserData: blockingCellphone,
  }));
};

const saveNewBlacklistItem = async (blacklistItem, currentUser) => {
  currentUser.blacklist.push(blacklistItem);
  await currentUser.save();
};

module.exports = { addBlock };
