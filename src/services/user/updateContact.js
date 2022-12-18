const { trier } = require("utility-store/src/classes/Trier");
const { errorThrower } = require("utility-store/src/functions/utilities");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const updateContact = serviceBuilder
  .create()
  .body(async (data) => {
    return await trier()
      .tryAsync(tryToUpdateOneContact, data)
      .throw()
      .runAsync();
  })
  .build();

const tryToUpdateOneContact = async ({
  currentUserId,
  editedValues,
  targetCellphone,
}) => {
  const currentUser = await findCurrentUser(currentUserId);

  const { cellphoneIndex } = checkExistenceOfContactItem(
    currentUser.contacts,
    targetCellphone
  );

  const newContact = createNewContact(editedValues, targetCellphone);

  await updateAndSaveNewContact(currentUser, newContact, cellphoneIndex);

  return { currentUser };
};

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const checkExistenceOfContactItem = (contacts, targetCellphone) => {
  const { cellphone: contactItem, cellphoneIndex } =
    userPropsUtilities.cellphoneFinder(contacts, targetCellphone);
  errorThrower(!contactItem, () => errors.CONTACT_ITEM_NOT_EXIST);

  return { cellphoneIndex };
};

const createNewContact = (editedValues, targetCellphone) => {
  return {
    ...userPropsUtilities.extractContact(targetCellphone),
    firstName: editedValues.firstName,
    lastName: editedValues.lastName,
  };
};

const updateAndSaveNewContact = async (
  currentUser,
  newContact,
  cellphoneIndex
) => {
  currentUser.contacts.splice(cellphoneIndex, 1, newContact);
  await currentUser.save();
};

module.exports = { updateContact };
