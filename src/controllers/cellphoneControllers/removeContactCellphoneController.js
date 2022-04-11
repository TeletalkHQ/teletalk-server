const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");
const { errorThrower } = require("~/functions/utilities/utils");

const removeContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user },
      body: { phoneNumber, countryCode, countryName },
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

    user.contacts.splice(cellphoneIndex, 1);

    await user.updateOne({
      contacts: user.contacts,
    });

    res.status(200).json({ removedContact: contactItem });
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { removeContactCellphoneController };
