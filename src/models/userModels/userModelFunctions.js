const { cellphoneFinder } = require("@/functions/utilities/cellphoneFinder");
const { errorThrower } = require("@/functions/utilities/utilsNoDeps");

const { UserMongoModel } = require("@/models/userModels/userMongoModel");

const {
  initialOptions: { userInitialOptions },
} = require("@/variables/constants/initialOptions/initialOptions");
const {
  userErrors: {
    properties: {
      BLACKLIST_ITEM_EXIST: { properties: BLACKLIST_ITEM_EXIST },
      BLACKLIST_ITEM_NOT_EXIST: { properties: BLACKLIST_ITEM_NOT_EXIST },
      CELLPHONE_NOT_EXIST: { properties: CELLPHONE_NOT_EXIST },
      CONTACT_ITEM_EXIST: { properties: CONTACT_ITEM_EXIST },
      CONTACT_ITEM_NOT_EXIST: { properties: CONTACT_ITEM_NOT_EXIST },
      TARGET_USER_NOT_EXIST: { properties: TARGET_USER_NOT_EXIST },
    },
  },
} = require("@/variables/errors/userErrors");

const userFinder = async (
  userData = userInitialOptions
  // findMethod = "findOne"
) => {
  try {
    errorThrower(!userData, "You should send me data to find your target");

    return await UserMongoModel.findOne(userData);
  } catch (error) {
    logger.log("userFinder catch", error);
    throw error;
  }
};

const addContactToUserBlacklist = async (
  currentUser = userInitialOptions,
  targetUserData = userInitialOptions
) => {
  try {
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
    await UserMongoModel.updateOne({
      blacklist: currentUser.blacklist,
    });
  } catch (error) {
    logger.log("addContactToUserBlacklist catch, error", error);
    throw error;
  }
};

const addContactToUserContacts = async (
  currentUser = userInitialOptions,
  targetUserData = userInitialOptions
) => {
  try {
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
      privateId: targetUser.privateId,
    });

    await currentUser.updateOne({
      contacts: currentUser.contacts,
    });

    return { targetUser };
  } catch (error) {
    logger.log("addContactToUserContacts catch, error:", error);
    throw error;
  }
};

const updateOneContact = async (
  currentUser = userInitialOptions,
  targetUserData = userInitialOptions,
  editedValues
) => {
  try {
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
      contacts: currentUser.contacts,
    });

    return { currentUser };
  } catch (error) {
    logger.log("updateOneContact catch, error:", error);
    throw error;
  }
};

const getUserContacts = async (currentUser = userInitialOptions) => {
  try {
    return currentUser.contacts;
  } catch (error) {
    logger.log("getUserContacts catch, error:", error);
  }
};

const deleteBlacklistItem = async (currentUser, targetUserData) => {
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
  currentUser = userInitialOptions,
  targetUserData = userInitialOptions
) => {
  try {
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

const updateUserDataByPrivateId = async (userData) => {
  try {
    await UserMongoModel.findOneAndUpdate(
      { privateId: userData.privateId },
      userData
    );
  } catch (error) {
    logger.log("updateUserTokens catch, error:", error);

    throw error;
  }
};

const createNewNormalUser = async (userData) => {
  try {
    const newUser = new UserMongoModel(userData);
    await newUser.save();

    return true;
  } catch (error) {
    logger.log("createNewNormalUser catch, error:", error);
    throw error;
  }
};

const addTestUser = async (
  countryCode,
  countryName,
  phoneNumber,
  firstName,
  lastName,
  privateId,
  token
) => {
  try {
    await UserMongoModel.updateOne(
      { countryCode, countryName, phoneNumber },
      { tokens: [{ token }], privateId, firstName, lastName },
      {
        upsert: true,
      }
    );

    const user = await userFinder({ countryCode, countryName, phoneNumber });

    return user;
  } catch (error) {
    logger.log("addTestUser catch, error:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  const users = await UserMongoModel.find();

  return users;
};

module.exports = {
  addContactToUserBlacklist,
  addContactToUserContacts,
  createNewNormalUser,
  deleteBlacklistItem,
  getUserContacts,
  removeContactItem,
  updateOneContact,
  updateUserDataByPrivateId,
  userFinder,
  getAllUsers,
  addTestUser,
};
