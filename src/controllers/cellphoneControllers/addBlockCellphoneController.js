const { trier } = require("utility-store/src/classes/Trier");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const {
  addCellphoneToUserBlacklist,
} = require("@/models/userModels/userModelFunctions");

const tryToAddBlockCellphone = async (blockingCellphone, currentUser) => {
  await addCellphoneToUserBlacklist(currentUser, blockingCellphone);
  return blockingCellphone;
};

const responseToAddBlockCellphone = (blockedCellphone, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    blockedCellphone,
  });
};

const catchAddToBlockCellphone = commonFunctionalities.controllerCatchResponse;

const addBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { body, currentUser } = req;
  const blockingCellphone = userPropsUtilities.extractCellphone(body);

  (
    await trier(addBlockCellphoneController.name).tryAsync(
      tryToAddBlockCellphone,
      blockingCellphone,
      currentUser
    )
  )
    .executeIfNoError(responseToAddBlockCellphone, res)
    .catch(catchAddToBlockCellphone, res);
};

module.exports = { addBlockCellphoneController };
