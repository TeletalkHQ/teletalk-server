const {
  getStatusCodeFromRoute,
  getCellphone,
} = require("~/functions/utilities/utilsNoDeps");
const {
  deleteBlacklistItem,
} = require("~/models/userModels/userModelFunctions");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const removeBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser, body } = req;

    const targetUserData = getCellphone(body);

    await deleteBlacklistItem(currentUser, targetUserData);

    res
      .status(getStatusCodeFromRoute(cellphoneRoutes.properties.removeBlock))
      .json({
        removedBlockedCellphone: targetUserData,
      });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { removeBlockCellphoneController };
