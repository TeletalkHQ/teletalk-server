const { trier } = require("utility-store/src/classes/Trier");
const { errorThrower } = require("utility-store/src/functions/utilities");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const updateContact = async ({
  currentUserId,
  editedValues,
  targetCellphone,
}) => {
  const tryToUpdateOneContact = async () => {
    const currentUser = await commonServices.userFinder({
      userId: currentUserId,
    });

    const { cellphone: contactItem, cellphoneIndex } =
      userPropsUtilities.cellphoneFinder(currentUser.contacts, targetCellphone);
    errorThrower(!contactItem, () => errors.CONTACT_ITEM_NOT_EXIST);

    const newContact = {
      ...userPropsUtilities.extractContact(targetCellphone),
      firstName: editedValues.firstName,
      lastName: editedValues.lastName,
    };
    currentUser.contacts.splice(cellphoneIndex, 1, newContact);
    await currentUser.save();

    return { currentUser };
  };

  return (await trier().tryAsync(tryToUpdateOneContact))
    .printAndThrow()
    .result();
};

module.exports = { updateContact };
