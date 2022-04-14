const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");
const { errorThrower } = require("~/functions/utilities/utils");

const { UserModel } = require("~/models/userModels/userMongoModel");

const {
  initialOptions: { userInitialOptions },
} = require("~/variables/constants/initialOptions/initialOptions");
const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");

const {
  BLACKLIST_ITEM_EXIST,
  BLACKLIST_ITEM_NOT_EXIST,
  CELLPHONE_NOT_EXIST,
  CONTACT_ITEM_EXIST,
  CONTACT_ITEM_NOT_EXIST,
  TARGET_USER_NOT_EXIST,
  USER_NOT_EXIST,
} = userErrorTemplate;

const userFinder = async (
  userData = userInitialOptions,
  findMethod = "findOne"
) => {
  try {
    errorThrower(!userData, "You should send me data to find your target");

    return await UserModel[findMethod]({
      ...userData,
    });
  } catch (error) {
    logger.log("userFinder catch", error);
    errorThrower(error, error);
  }
};

const addContactToUserBlacklist = async (
  currentUserData = userInitialOptions,
  targetUserData = userInitialOptions
) => {
  try {
    const currentUser = await userFinder(currentUserData);
    errorThrower(currentUser === null, {
      ...targetUserData,
      ...USER_NOT_EXIST,
    });

    const { cellphone: existBlacklistItem } = cellphoneFinder(
      currentUser.blacklist,
      targetUserData
    );
    errorThrower(existBlacklistItem, {
      ...targetUserData,
      ...BLACKLIST_ITEM_EXIST,
    });

    const targetUser = await userFinder(targetUserData);
    errorThrower(targetUser === null, {
      ...targetUserData,
      ...TARGET_USER_NOT_EXIST,
    });

    const blacklistItem = {
      phoneNumber: targetUserData.phoneNumber,
      countryCode: targetUserData.countryCode,
      countryName: targetUserData.countryName,
    };
    currentUser.blacklist.push(blacklistItem);
    await UserModel.updateOne({
      blacklist: currentUser.blacklist,
    });
  } catch (error) {
    logger.log("addContactToUserBlacklist catch, error", error);
    throw error;
  }
};

const addContactToUserContacts = async (
  currentUserData = userInitialOptions,
  targetUserData = userInitialOptions
) => {
  const currentUser = await userFinder(currentUserData);
  errorThrower(currentUser === null, {
    ...targetUserData,
    ...USER_NOT_EXIST,
  });

  const { cellphone: existContactItem } = cellphoneFinder(
    currentUser.contacts,
    targetUserData
  );
  errorThrower(existContactItem, {
    ...targetUserData,
    ...CONTACT_ITEM_EXIST,
  });

  const targetUser = await userFinder(targetUserData);
  errorThrower(targetUser === null, {
    ...targetUserData,
    ...TARGET_USER_NOT_EXIST,
  });

  currentUser.contacts.push({
    countryCode: targetUserData.countryCode,
    countryName: targetUserData.countryName,
    firstName: targetUserData.firstName,
    lastName: targetUserData.lastName,
    phoneNumber: targetUserData.phoneNumber,
    privateID: targetUser.privateID,
  });

  await currentUser.updateOne({
    contacts: currentUser.contacts,
  });

  return { targetUser };
};

const updateOneContact = async (
  currentUserData = userInitialOptions,
  targetUserData = userInitialOptions,
  editedValues
) => {
  try {
    const currentUser = await userFinder(currentUserData);
    errorThrower(!currentUser, USER_NOT_EXIST);

    const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder(
      currentUser.contacts,
      targetUserData
    );
    errorThrower(!contactItem, CONTACT_ITEM_NOT_EXIST);

    currentUser.contacts.splice(cellphoneIndex, 1, {
      ...targetUserData,
      firstName: editedValues.firstName,
      lastName: editedValues.lastName,
    });
    await currentUser.updateOne({
      contacts: currentUserData.contacts,
    });

    return { currentUser };
  } catch (error) {
    logger.log("updateOneContact catch, error:", error);
    throw error;
  }
};

const getUserContacts = async (currentUserData = userInitialOptions) => {
  try {
    const currentUser = await userFinder(currentUserData);
    errorThrower(!currentUser, USER_NOT_EXIST);

    return currentUser.contacts;
  } catch (error) {
    logger.log("getUserContacts catch, error:", error);
  }
};

const deleteBlacklistItem = async (currentUserData, targetUserData) => {
  const currentUser = userFinder(currentUserData);
  errorThrower(!currentUser, USER_NOT_EXIST);

  const { cellphone: blacklistItem, cellphoneIndex } = cellphoneFinder(
    currentUser.blacklist,
    targetUserData
  );
  errorThrower(!blacklistItem, BLACKLIST_ITEM_NOT_EXIST);

  currentUser.blacklist.splice(cellphoneIndex, 1);

  await currentUser.updateOne({
    blacklist: currentUser.blacklist,
  });
};

const removeContactItem = async (
  currentUserData = userInitialOptions,
  targetUserData = userInitialOptions
) => {
  try {
    const currentUser = userFinder(currentUserData);
    errorThrower(!currentUser, USER_NOT_EXIST);

    const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder(
      currentUser.contacts,
      targetUserData
    );
    errorThrower(!contactItem, CELLPHONE_NOT_EXIST);

    currentUser.contacts.splice(cellphoneIndex, 1);
    await currentUser.updateOne({
      contacts: currentUser.contacts,
    });
  } catch (error) {
    logger.log("removeContactItem catch, error:", error);
    throw error;
  }
};

module.exports = {
  addContactToUserBlacklist,
  addContactToUserContacts,
  updateOneContact,
  getUserContacts,
  deleteBlacklistItem,
  removeContactItem,
  userFinder,
};
