const { errorThrower } = require("utility-store/src/functions/utilities");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const updateContact = serviceBuilder
  .create()
  .body(async ({ currentUserId, editedValues, targetCellphone }) => {
    const currentUser = await findCurrentUser(currentUserId);

    const { contactIndex, contact: oldContact } = findContact(
      currentUser.contacts,
      targetCellphone
    );

    const newContact = updateContactFields(editedValues, oldContact);

    await updateAndSaveNewContact(currentUser, newContact, contactIndex);

    return { currentUser };
  })
  .build();

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const findContact = (contacts, targetCellphone) => {
  const { cellphone: contact, cellphoneIndex: contactIndex } =
    userPropsUtilities.cellphoneFinder(contacts, targetCellphone);
  errorThrower(!contact, () => errors.CONTACT_ITEM_NOT_EXIST);

  return { contact, contactIndex };
};

const updateContactFields = (editedValues, oldContact) => {
  return {
    ...oldContact,
    firstName: editedValues.firstName,
    lastName: editedValues.lastName,
  };
};

const updateAndSaveNewContact = async (
  currentUser,
  newContact,
  contactIndex
) => {
  currentUser.contacts.splice(contactIndex, 1, newContact);
  await currentUser.save();
};

module.exports = { updateContact };
