const { getStatusCodeFromRoute } = require("~/functions/utilities/utilsNoDeps");
const {
  deleteBlacklistItem,
} = require("~/models/userModels/userModelFunctions");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const removeBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      currentUser,
      body: { phoneNumber, countryCode, countryName },
    } = req;

    const targetUserData = { phoneNumber, countryCode, countryName };

    await deleteBlacklistItem(currentUser, targetUserData);

    res
      .status(getStatusCodeFromRoute(cellphoneRoutes.properties.removeBlock))
      .json({
        removedBlockedCellphone: targetUserData,
      });
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { removeBlockCellphoneController };
