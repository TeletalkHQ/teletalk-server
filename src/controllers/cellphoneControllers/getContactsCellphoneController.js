const { getUserContacts } = require("~/models/userModels/userModelFunctions");
const {
  cellphoneRoutes: { properties: getContactsRoute },
} = require("~/variables/routes/cellphoneRoutes");

const getContactsCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser } = req;

    const contacts = await getUserContacts(currentUser);

    res.sendJsonResponse(getContactsRoute, {
      contacts,
    });
  } catch (error) {
    logger.log("getContactsCellphoneController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getContactsCellphoneController };
