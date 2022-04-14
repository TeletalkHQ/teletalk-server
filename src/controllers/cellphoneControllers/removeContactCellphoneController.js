const { getMethodFromRoute } = require("~/functions/utilities/utils");
const { removeContactItem } = require("~/models/userModels/user.model");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const removeContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      authData,
      body: { phoneNumber, countryCode, countryName },
    } = req;

    const targetUserData = { phoneNumber, countryCode, countryName };

    await removeContactItem(authData, targetUserData);

    res
      .status(getMethodFromRoute(cellphoneRoutes.removeContact))
      .json({ removedContact: targetUserData });
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { removeContactCellphoneController };
