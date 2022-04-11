const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");

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

    const { cellphone: cellphoneInClientContacts } = cellphoneFinder({
      cellphones: user.contacts,
      targetCell: cellphoneFromClient,
    });

    if (cellphoneInClientContacts !== undefined) {
      const error = userErrorTemplate.CELLPHONE_EXIST;
      throw error;
    }

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
