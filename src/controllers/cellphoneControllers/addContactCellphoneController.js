const { getMethodFromRoute } = require("~/functions/utilities/utils");
const { addContactToUserContacts } = require("~/models/userModels/user.model");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const addContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { firstName, lastName, phoneNumber, countryCode, countryName },
      authData,
    } = req;

    const targetUserData = { phoneNumber, countryCode, countryName };

    const { targetUser } = await addContactToUserContacts(
      authData,
      targetUserData
    );

    res.status(getMethodFromRoute(cellphoneRoutes.addContact)).json({
      contact: {
        ...targetUserData,
        firstName,
        lastName,
        privateID: targetUser.privateID,
      },
    });
  } catch (error) {
    logger.log("addContactCellphoneController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { addContactCellphoneController };
