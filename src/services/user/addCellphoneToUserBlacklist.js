const { errorThrower } = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const addCellphoneToUserBlacklist = serviceBuilder
  .create()
  .body(async (data) => {
    return (
      await trier(addCellphoneToUserBlacklist.name).tryAsync(
        tryToAddCellphoneToUserBlacklist,
        data
      )
    )
      .printAndThrow()
      .result();
  })
  .build();

const tryToAddCellphoneToUserBlacklist = async ({
  currentUserId,
  blockingCellphone,
}) => {
  const currentUser = await commonServices.findOneUserById(currentUserId);

  await serviceHelper.findOneUser(
    blockingCellphone,
    errors.TARGET_USER_NOT_EXIST
  );

  checkExistenceOfBlacklistItem(currentUser.blacklist, blockingCellphone);

  const blacklistItem = userPropsUtilities.extractCellphone(blockingCellphone);

  await saveNewBlacklistItem(blacklistItem, currentUser);
};

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

module.exports = { addCellphoneToUserBlacklist };
