const { errorThrower } = require("utility-store/src/utilities/utilities");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const addContact = serviceBuilder
  .create()
  .body(async ({ currentUserId, newContactData }) => {
    const currentUser = await commonServices.findOneUserById(currentUserId);

    checkExistenceOfContactItem(currentUser.contacts, newContactData);

    const targetUserCellphone =
      userPropsUtilities.extractCellphone(newContactData);

    const targetUser = await serviceHelper.findOneUser(
      targetUserCellphone,
      errors.TARGET_USER_NOT_EXIST
    );

    const newContact = {
      ...newContactData,
      userId: targetUser.userId,
    };

    await saveNewContactItem(currentUser, newContact);

    return { newContact };
  })
  .build();

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

const saveNewContactItem = async (currentUser, newContact) => {
  currentUser.contacts.push(newContact);
  await currentUser.save();
};

module.exports = { addContact };
