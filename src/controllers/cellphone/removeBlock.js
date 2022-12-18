const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToRemoveBlock = async (data) => {
  await services.removeBlacklistItem.run(data);
};

const responseToRemoveBlock = (_, res, targetUserData) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    removedBlockedCellphone: targetUserData,
  });
};

const catchRemoveBlock = commonFunctionalities.controllerErrorResponse;

const removeBlock = async (req = expressRequest, res = expressResponse) => {
  const { currentUserId, body } = req;
  const targetUserData = userPropsUtilities.extractCellphone(body);

  (
    await trier(removeBlock.name).tryAsync(tryToRemoveBlock, {
      currentUserId,
      targetUserData,
    })
  )
    .executeIfNoError(responseToRemoveBlock, res, targetUserData)
    .catch(catchRemoveBlock, res);
};

module.exports = { removeBlock };
