const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { errorThrower } = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const addCellphoneToUserBlacklist = serviceBuilder
  .create()
  .body(async ({ currentUserId, blockingCellphone }) => {
    const tryToAddCellphoneToUserBlacklist = async () => {
      const currentUser = await commonServices.findUserById(currentUserId);

      const { cellphone: existBlacklistItem } =
        userPropsUtilities.cellphoneFinder(
          currentUser.blacklist,
          blockingCellphone
        );

      errorThrower(existBlacklistItem, () => ({
        ...errors.BLACKLIST_ITEM_EXIST,
        targetUserData: blockingCellphone,
      }));

      const targetUser = await commonServices.findUser(blockingCellphone);
      errorThrower(customTypeof.isNull(targetUser), () => ({
        ...errors.TARGET_USER_NOT_EXIST,
        targetUserData: blockingCellphone,
      }));

      const blacklistItem =
        userPropsUtilities.extractCellphone(blockingCellphone);
      currentUser.blacklist.push(blacklistItem);
      await currentUser.save();
    };

    return (
      await trier(addCellphoneToUserBlacklist.name).tryAsync(
        tryToAddCellphoneToUserBlacklist
      )
    )
      .printAndThrow()
      .result();
  })
  .build();

module.exports = { addCellphoneToUserBlacklist };
