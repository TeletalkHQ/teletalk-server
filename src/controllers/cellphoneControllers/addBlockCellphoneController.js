const { getCellphone } = require("@/functions/utilities/utilsNoDeps");
const {
  addCellphoneToUserBlacklist,
} = require("@/models/userModels/userModelFunctions");
const {
  cellphoneRoutes: { addBlockRoute },
} = require("@/variables/routes/cellphoneRoutes");

const addBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { body, currentUser } = req;

    const targetUser = getCellphone(body);

    await addCellphoneToUserBlacklist(currentUser, targetUser);

    res.sendJsonResponse(addBlockRoute, {
      blockedCellphone: targetUser,
    });
  } catch (error) {
    logger.log("addBlockCellphoneController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { addBlockCellphoneController };
