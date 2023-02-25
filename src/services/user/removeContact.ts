const { errorThrower } = require("utility-store/src/utilities/utilities");

const { userUtilities } = require("@/classes/UserUtilities");
const { serviceHelper } = require("@/classes/service/ServiceHelper");
const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { errors } = require("@/variables/errors");

const removeContact = serviceBuilder
  .create()
  .body(async ({ currentUserId, targetUserData }) => {
    const currentUser = await findCurrentUser(currentUserId);

    const { index } = checkExistenceOfContactItem(
      currentUser.contacts,
      targetUserData
    );

    await removeContactAndSave(currentUser, index);
  })
  .build();

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const checkExistenceOfContactItem = (contacts, targetUserData) => {
  const { item: contactItem, index } = userUtilities.findByCellphone(
    contacts,
    targetUserData
  );
  errorThrower(!contactItem, () => ({
    ...errors.CONTACT_ITEM_NOT_EXIST,
    targetUserData,
  }));

  return { index };
};

const removeContactAndSave = async (currentUser, index) => {
  currentUser.contacts.splice(index, 1);
  await currentUser.save();
};

module.exports = { removeContact };
