const { errorThrower } = require("utility-store/src/functions/utilities");
const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const addContactToUserContacts = async ({ currentUserId, contact }) => {
  const tryToAddContactToUserContacts = async () => {
    const currentUser = await commonServices.findUserById(currentUserId);

    const { cellphone: isContactExist } = userPropsUtilities.cellphoneFinder(
      currentUser.contacts,
      contact
    );
    errorThrower(isContactExist, () => ({
      ...errors.CONTACT_ITEM_EXIST,
      targetUserData: contact,
    }));

    const addingContact = userPropsUtilities.extractCellphone(contact);
    const targetUser = await commonServices.findUser(addingContact);
    errorThrower(customTypeof.isNull(targetUser), () => ({
      ...errors.TARGET_USER_NOT_EXIST,
      targetUserData: contact,
    }));

    const newContact = userPropsUtilities.extractContact({
      ...contact,
      userId: targetUser.userId,
    });
    currentUser.contacts.push(newContact);
    await currentUser.save();

    return { newContact };
  };

  return (
    await trier(addContactToUserContacts.name).tryAsync(
      tryToAddContactToUserContacts
    )
  )
    .printAndThrow()
    .result();
};

module.exports = { addContactToUserContacts };
