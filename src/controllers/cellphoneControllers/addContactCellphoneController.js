const { getStatusCodeFromRoute } = require("~/functions/utilities/utils");
const {
  addContactToUserContacts,
} = require("~/models/userModels/userModelFunctions");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const addContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { firstName, lastName, phoneNumber, countryCode, countryName },
      currentUser,
    } = req;

    const targetUserData = { phoneNumber, countryCode, countryName };

    const { targetUser } = await addContactToUserContacts(
      currentUser,
      targetUserData
    );

    res
      .status(getStatusCodeFromRoute(cellphoneRoutes.properties.addContact))
      .json({
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
