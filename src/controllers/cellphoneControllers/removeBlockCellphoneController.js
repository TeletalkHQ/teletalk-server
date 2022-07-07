const { userProps } = require("@/classes/UserProps");
const {
  deleteBlacklistItem,
} = require("@/models/userModels/userModelFunctions");

const removeBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser, body } = req;

    const targetUserData = userProps.makeCellphoneByObjectParam(body);

    await deleteBlacklistItem(currentUser, targetUserData);

    res.checkDataAndResponse({
      removedBlockedCellphone: targetUserData,
    });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { removeBlockCellphoneController };
