const { sendableUserData } = require("~/functions/utilities/sendableUserData");

const getContactsCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user },
    } = req;

    const { userData } = sendableUserData({ user });

    res.status(200).json({ contacts: userData.contacts });
  } catch (error) {
    logger.log("getContactsCellphoneController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { getContactsCellphoneController };
