const { errorThrower } = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const addContact = serviceBuilder
  .create()
  .body(async (data) => {
    return await trier(addContact.name)
      .tryAsync(tryToAddContactToUserContacts, data)
      .throw()
      .runAsync();
  })
  .build();

const tryToAddContactToUserContacts = async ({ currentUserId, contact }) => {
  const currentUser = await commonServices.findOneUserById(currentUserId);

  checkExistenceOfContactItem(currentUser.contacts, contact);

  const addingContact = userPropsUtilities.extractCellphone(contact);

  const targetUser = await serviceHelper.findOneUser(
    addingContact,
    errors.TARGET_USER_NOT_EXIST
  );

  const newContact = createNewContact(targetUser.userId, contact);

  await saveNewContactItem(currentUser, newContact);

  return { newContact };
};

const checkExistenceOfContactItem = (contacts, contact) => {
  const { cellphone: isContactExist } = userPropsUtilities.cellphoneFinder(
    contacts,
    contact
  );
  errorThrower(isContactExist, () => ({
    ...errors.CONTACT_ITEM_EXIST,
    queryData: contact,
  }));
};

const createNewContact = (userId, contact) => {
  return userPropsUtilities.extractContact({
    ...contact,
    userId,
  });
};

const saveNewContactItem = async (currentUser, newContact) => {
  currentUser.contacts.push(newContact);
  await currentUser.save();
};

module.exports = { addContact };
