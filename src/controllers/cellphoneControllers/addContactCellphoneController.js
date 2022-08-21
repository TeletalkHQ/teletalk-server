const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  addContactToUserContacts,
} = require("@/models/userModels/userModelFunctions");

const addContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { body, currentUser } = req;
    const targetUserData = userPropsUtilities.extractContact(body);

    const { targetUser } = await addContactToUserContacts(
      currentUser,
      targetUserData
    );

    res.checkDataAndResponse({
      addedContact: {
        ...targetUserData,
        privateId: targetUser.privateId,
      },
    });
  } catch (error) {
    logger.log("addContactCellphoneController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { addContactCellphoneController };
