const { getMethodFromRoute } = require("~/functions/utilities/utils");
const { addContactToUserBlacklist } = require("~/models/userModels/user.model");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const addBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { phoneNumber, countryCode, countryName },
      authData,
    } = req;

    const targetUser = { phoneNumber, countryCode, countryName };

    await addContactToUserBlacklist(authData.payload, targetUser);

    res.status(getMethodFromRoute(cellphoneRoutes.addBlock)).json({
      blockedCellphone: targetUser,
    });
  } catch (error) {
    logger.log("addBlockCellphoneController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { addBlockCellphoneController };
