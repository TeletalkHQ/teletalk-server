const { getUserContacts } = require("~/models/userModels/userModelFunctions");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const getContactsCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser } = req;

    const contacts = await getUserContacts(currentUser);

    res.sendJsonResponse(cellphoneRoutes.properties.getContactsRoute, {
      contacts,
    });
  } catch (error) {
    logger.log("getContactsCellphoneController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getContactsCellphoneController };
