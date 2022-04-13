const { updateUserContacts } = require("~/models/userModels/user.model");

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

    const { targetUser } = await updateUserContacts(authData, targetUserData);

    res.status(200).json({
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
