const { errorThrower } = require("utility-store/src/functions/utilities");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const removeBlock = serviceBuilder
  .create()
  .body(async ({ currentUserId, targetUserData }) => {
    const currentUser = await findCurrentUser(currentUserId);

    const { cellphoneIndex } = checkExistenceOfBlacklistItem(
      currentUser.blacklist,
      targetUserData
    );

    await removeBlockAndSave(currentUser, cellphoneIndex);
  })
  .build();

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const checkExistenceOfBlacklistItem = (blacklist, targetUserData) => {
  const { cellphone: blacklistItem, cellphoneIndex } =
    userPropsUtilities.cellphoneFinder(blacklist, targetUserData);
  errorThrower(!blacklistItem, () => errors.BLACKLIST_ITEM_NOT_EXIST);

  return { cellphoneIndex };
};

const removeBlockAndSave = async (currentUser, cellphoneIndex) => {
  currentUser.blacklist.splice(cellphoneIndex, 1);
  await currentUser.save();
};

module.exports = { removeBlock };
