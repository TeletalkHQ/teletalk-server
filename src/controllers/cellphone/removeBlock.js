const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { deleteBlacklistItem } = require("@/services/userServices");

const tryToRemoveBlock = async (currentUser, targetUserData) => {
  await deleteBlacklistItem(currentUser, targetUserData);
};

const responseToRemoveBlock = (_, res, targetUserData) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    removedBlockedCellphone: targetUserData,
  });
};

const catchRemoveBlock = commonFunctionalities.controllerCatchResponse;

const removeBlock = async (req = expressRequest, res = expressResponse) => {
  const { currentUser, body } = req;
  const targetUserData = userPropsUtilities.extractCellphone(body);

  (
    await trier(removeBlock.name).tryAsync(
      tryToRemoveBlock,
      currentUser,
      targetUserData
    )
  )
    .executeIfNoError(responseToRemoveBlock, res, targetUserData)
    .catch(catchRemoveBlock, res);
};

module.exports = { removeBlock };
