const { getMethodFromRoute } = require("~/functions/utilities/utils");
const { updateOneContact } = require("~/models/userModels/userModelFunctions");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const editContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { firstName, lastName, phoneNumber, countryCode, countryName },
      authData,
    } = req;

    const targetUserData = {
      phoneNumber,
      countryCode,
      countryName,
    };

    const editedValues = { firstName, lastName };

    await updateOneContact(authData.payload, targetUserData, editedValues);

    res
      .status(getMethodFromRoute(cellphoneRoutes.editContact))
      .json({ phoneNumber, countryCode, countryName, ...editedValues });
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { editContactCellphoneController };
