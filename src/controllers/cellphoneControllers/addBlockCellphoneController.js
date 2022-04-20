const { getStatusCodeFromRoute } = require("~/functions/utilities/utilsNoDeps");
const {
  addContactToUserBlacklist,
} = require("~/models/userModels/userModelFunctions");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const addBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { phoneNumber, countryCode, countryName },
      currentUser,
    } = req;

    const targetUser = { phoneNumber, countryCode, countryName };

    await addContactToUserBlacklist(currentUser, targetUser);

    res
      .status(getStatusCodeFromRoute(cellphoneRoutes.properties.addBlock))
      .json({
        blockedCellphone: targetUser,
      });
  } catch (error) {
    logger.log("addBlockCellphoneController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { addBlockCellphoneController };
