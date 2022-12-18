const { errorThrower } = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { serviceHelper } = require("@/classes/service/ServiceHelper");
const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { errors } = require("@/variables/errors");

const removeContactItem = serviceBuilder
  .create()
  .body(async (data) => {
    return (
      await trier(removeContactItem.name).tryAsync(tryToRemoveContactItem, data)
    )
      .printAndThrow()
      .result();
  })
  .build();

const tryToRemoveContactItem = async ({ currentUserId, targetUserData }) => {
  const currentUser = await findCurrentUser(currentUserId);

  const { cellphoneIndex } = checkExistenceOfContactItem(
    currentUser.contacts,
    targetUserData
  );

  await removeContactItemAndSave(currentUser, cellphoneIndex);
};

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const checkExistenceOfContactItem = (contacts, targetUserData) => {
  const { cellphone: contactItem, cellphoneIndex } =
    userPropsUtilities.cellphoneFinder(contacts, targetUserData);
  errorThrower(!contactItem, () => ({
    ...errors.CONTACT_ITEM_NOT_EXIST,
    targetUserData,
  }));

  return { cellphoneIndex };
};

const removeContactItemAndSave = async (currentUser, cellphoneIndex) => {
  //TODO: Remove all splice and use arrayUtilities
  currentUser.contacts.splice(cellphoneIndex, 1);
  await currentUser.save();
};

module.exports = { removeContactItem };
