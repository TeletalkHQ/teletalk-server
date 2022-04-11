const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");
const { errorThrower } = require("~/functions/utilities/utils");

const addContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user, targetUser },
      body: { firstName, lastName, phoneNumber, countryCode, countryName },
    } = req;

    const cellphoneFromClient = { phoneNumber, countryCode, countryName };

    const { cellphone: cellphoneInClientContacts } = cellphoneFinder(
      user.contacts,
      cellphoneFromClient
    );

    errorThrower(
      cellphoneInClientContacts !== undefined,
      userErrorTemplate.CELLPHONE_EXIST
    );

    user.contacts.push({
      ...cellphoneFromClient,
      firstName,
      lastName,
      privateID: targetUser.privateID,
    });

    await user.updateOne({
      contacts: user.contacts,
    });

    res.status(200).json({
      contact: {
        ...cellphoneFromClient,
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
