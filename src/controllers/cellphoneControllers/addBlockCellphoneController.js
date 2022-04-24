const { getCellphone } = require("~/functions/utilities/utilsNoDeps");
const {
  addContactToUserBlacklist,
} = require("~/models/userModels/userModelFunctions");
const {
  cellphoneRoutes: {
    properties: {
      addBlockRoute: { properties: addBlockRoute },
    },
  },
} = require("~/variables/routes/cellphoneRoutes");

const addBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { body, currentUser } = req;

    const targetUser = getCellphone(body);

    await addContactToUserBlacklist(currentUser, targetUser);

    res.sendJsonResponse(addBlockRoute, {
      blockedCellphone: targetUser,
    });
  } catch (error) {
    logger.log("addBlockCellphoneController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { addBlockCellphoneController };
