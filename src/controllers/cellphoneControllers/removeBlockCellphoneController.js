const {
  deleteBlacklistItem,
} = require("~/models/userModels/userModelFunctions");

const removeBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      authData,
      body: { phoneNumber, countryCode, countryName },
    } = req;

    const targetUserData = { phoneNumber, countryCode, countryName };

    await deleteBlacklistItem(authData.payload, targetUserData);

    res.status(200).json({
      removedBlockedCellphone: targetUserData,
    });
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { removeBlockCellphoneController };
