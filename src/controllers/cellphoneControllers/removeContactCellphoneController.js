const { getCellphone } = require("@/functions/utilities/utilsNoDeps");
const { removeContactItem } = require("@/models/userModels/userModelFunctions");
const {
  cellphoneRoutes: { removeContactRoute },
} = require("@/variables/routes/cellphoneRoutes");

const removeContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser, body } = req;

    const targetUserData = getCellphone(body);

    await removeContactItem(currentUser, targetUserData);

    res.sendJsonResponse(removeContactRoute, {
      removedContact: targetUserData,
    });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { removeContactCellphoneController };
