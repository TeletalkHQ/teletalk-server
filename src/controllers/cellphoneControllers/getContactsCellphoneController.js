const { getUserContacts } = require("@/models/userModels/userModelFunctions");

const getContactsCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser } = req;

    const contacts = await getUserContacts(currentUser);

    res.checkAndResponse({
      contacts,
    });
  } catch (error) {
    logger.log("getContactsCellphoneController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getContactsCellphoneController };
