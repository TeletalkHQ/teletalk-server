const { userProps } = require("@/functions/helpers/UserProps");
const {
  deleteBlacklistItem,
} = require("@/models/userModels/userModelFunctions");

const removeBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser, body } = req;

    const targetUserData = userProps.getCellphone(body);

    await deleteBlacklistItem(currentUser, targetUserData);

    res.checkAndResponse({
      removedBlockedCellphone: targetUserData,
    });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { removeBlockCellphoneController };
