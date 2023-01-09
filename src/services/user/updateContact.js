const { errorThrower } = require("utility-store/src/utilities/utilities");

const { userUtilities } = require("@/classes/UserUtilities");
const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const updateContact = serviceBuilder
  .create()
  .body(async ({ currentUserId, editedValues, targetCellphone }) => {
    const currentUser = await findCurrentUser(currentUserId);

    const { index, contact: oldContact } = findContact(
      currentUser.contacts,
      targetCellphone
    );

    errorThrower(!oldContact, {
      ...errors.CONTACT_ITEM_NOT_EXIST,
      targetCellphone,
    });

    const newContact = updateContactFields(editedValues, oldContact);

    await updateAndSaveNewContact(currentUser, newContact, index);

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
  const { item: contact, index } = userUtilities.findByCellphone(
    contacts,
    targetCellphone
  );

  return { contact, index };
};

const updateContactFields = (editedValues, oldContact) => {
  return {
    ...oldContact,
    firstName: editedValues.firstName,
    lastName: editedValues.lastName,
  };
};

const updateAndSaveNewContact = async (currentUser, newContact, index) => {
  currentUser.contacts.splice(index, 1, newContact);
  await currentUser.save();
};

module.exports = { updateContact };
