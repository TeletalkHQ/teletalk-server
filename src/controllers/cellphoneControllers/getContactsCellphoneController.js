const { getMethodFromRoute } = require("~/functions/utilities/utils");
const { getUserContacts } = require("~/models/userModels/userModelFunctions");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const getContactsCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { authData } = req;

    const contacts = await getUserContacts(authData.payload);

    res
      .status(getMethodFromRoute(cellphoneRoutes.getContacts))
      .json({ contacts });
  } catch (error) {
    logger.log("getContactsCellphoneController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { getContactsCellphoneController };
