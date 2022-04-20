const { getStatusCodeFromRoute } = require("~/functions/utilities/utilsNoDeps");
const { updateOneContact } = require("~/models/userModels/userModelFunctions");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const editContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { firstName, lastName, phoneNumber, countryCode, countryName },
      currentUser,
    } = req;

    const targetUserData = {
      phoneNumber,
      countryCode,
      countryName,
    };

    const editedValues = { firstName, lastName };

    await updateOneContact(currentUser, targetUserData, editedValues);

    res
      .status(getStatusCodeFromRoute(cellphoneRoutes.properties.editContact))
      .json({ phoneNumber, countryCode, countryName, ...editedValues });
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { editContactCellphoneController };
