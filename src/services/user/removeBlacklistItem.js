const { errorThrower } = require("utility-store/src/functions/utilities");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const removeBlacklistItem = async ({ currentUserId, targetUserData }) => {
  const currentUser = await commonServices.findUserById(currentUserId);

  const { cellphone: blacklistItem, cellphoneIndex } =
    userPropsUtilities.cellphoneFinder(currentUser.blacklist, targetUserData);
  errorThrower(!blacklistItem, () => errors.BLACKLIST_ITEM_NOT_EXIST);

  currentUser.blacklist.splice(cellphoneIndex, 1);
  await currentUser.save();
};

module.exports = { removeBlacklistItem };
