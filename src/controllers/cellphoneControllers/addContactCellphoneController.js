const { getCellphone } = require("@/functions/utilities/utilsNoDeps");
const {
  addContactToUserContacts,
} = require("@/models/userModels/userModelFunctions");
const {
  cellphoneRoutes: {
    properties: {
      addContactRoute: { properties: addContactRoute },
    },
  },
} = require("@/variables/routes/cellphoneRoutes");

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

    res.sendJsonResponse(addContactRoute, {
      contact: {
        ...targetUserData,
        firstName,
        lastName,
        privateId: targetUser.privateId,
      },
    });
  } catch (error) {
    logger.log("addContactCellphoneController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { addContactCellphoneController };
