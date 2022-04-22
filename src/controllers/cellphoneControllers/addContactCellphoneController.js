const {
  getStatusCodeFromRoute,
  getCellphone,
} = require("~/functions/utilities/utilsNoDeps");
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
      body: { firstName, lastName },
      currentUser,
    } = req;

    const targetUserData = getCellphone(req.body);

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
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { addContactCellphoneController };
