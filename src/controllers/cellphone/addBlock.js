const { trier } = require("utility-store/src/classes/Trier");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToAddBlockCellphone = async (data) => {
  await services.addBlock.run(data);

  return data.blockingCellphone;
};

const responseToAddBlockCellphone = (blockedCellphone, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    blockedCellphone,
  });
};

const catchAddToBlockCellphone = commonFunctionalities.controllerErrorResponse;

const addBlock = async (req = expressRequest, res = expressResponse) => {
  const { body, currentUserId } = req;
  const blockingCellphone = userPropsUtilities.extractCellphone(body);

  (
    await trier(addBlock.name).tryAsync(tryToAddBlockCellphone, {
      blockingCellphone,
      currentUserId,
    })
  )
    .executeIfNoError(responseToAddBlockCellphone, res)
    .catch(catchAddToBlockCellphone, res);
};

module.exports = { addBlock };
