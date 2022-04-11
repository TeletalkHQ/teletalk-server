const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");
const { errorThrower } = require("~/functions/utilities/utils");

const editContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user },
      body: { firstName, lastName, phoneNumber, countryCode, countryName },
    } = req;

    const cellphone = { phoneNumber, countryCode, countryName };

    const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder(
      user.contacts,
      cellphone
    );

    errorThrower(
      contactItem === undefined,
      userErrorTemplate.CELLPHONE_NOT_EXIST
    );

    const editedContact = { ...cellphone, firstName, lastName };

    user.contacts.splice(cellphoneIndex, 1, editedContact);

    await user.updateOne({
      contacts: user.contacts,
    });

    res.status(200).json({ ...contactItem, lastName, firstName });
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { editContactCellphoneController };
