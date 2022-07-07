const { customTypeof } = require("@/classes/CustomTypeof");

const {
  cellphoneFinder,
  errorThrower,
  getErrorObject,
} = require("@/functions/utilities/utils");
const { userProps } = require("@/classes/UserProps");

const { UserMongoModel } = require("@/models/userModels/userMongoModel");

const {
  initialOptions: { userInitialOptions },
} = require("@/variables/others/initialOptions");
const {
  userErrors: {
    BLACKLIST_ITEM_EXIST,
    BLACKLIST_ITEM_NOT_EXIST,
    CONTACT_ITEM_EXIST,
    CONTACT_ITEM_NOT_EXIST,
    TARGET_USER_NOT_EXIST,
    USER_NOT_EXIST,
  },
} = require("@/variables/errors/userErrors");

const userFinder = async (
  userData = userInitialOptions,
  options = { lean: true }
) => {
  try {
    errorThrower(!userData, "You should send me data to find your target");

    return await UserMongoModel.findOne(userData, undefined, options);
  } catch (error) {
    logger.log("userFinder catch, error:", error);
    errorThrower(error, error);
  }
};

const addCellphoneToUserBlacklist = async (
  currentUser = userInitialOptions,
  cellphone
) => {
  try {
    const { cellphone: existBlacklistItem } = cellphoneFinder(
      currentUser.blacklist,
      cellphone
    );

    errorThrower(existBlacklistItem, () =>
      getErrorObject(BLACKLIST_ITEM_EXIST, { targetUserData: cellphone })
    );

    const targetUser = await userFinder(cellphone);
    errorThrower(customTypeof.check(targetUser).type.null, () =>
      getErrorObject(TARGET_USER_NOT_EXIST, { targetUserData: cellphone })
    );

    const blacklistItem = userProps.makeCellphoneByParam(cellphone);

    currentUser.blacklist.push(blacklistItem);
    await currentUser.updateOne({
      blacklist: currentUser.blacklist,
    });
  } catch (error) {
    logger.log("addCellphoneToUserBlacklist catch, error:", error);
    errorThrower(error, error);
  }
};

const addContactToUserContacts = async (
  currentUser = userInitialOptions,
  targetUserData = userInitialOptions
) => {
  try {
    const { cellphone: isContactExist } = cellphoneFinder(
      currentUser.contacts,
      targetUserData
    );
    errorThrower(isContactExist, () =>
      getErrorObject(CONTACT_ITEM_EXIST, { targetUserData })
    );

    const targetUser = await userFinder(
      userProps.makeCellphoneByParam(targetUserData)
    );
    errorThrower(customTypeof.check(targetUser).type.null, () =>
      getErrorObject(TARGET_USER_NOT_EXIST, { targetUserData })
    );

    currentUser.contacts.push(
      userProps.makeContactByParam({
        ...targetUserData,
        privateId: targetUser.privateId,
      })
    );

    await currentUser.updateOne({
      contacts: currentUser.contacts,
    });

    return { targetUser, currentUser };
  } catch (error) {
    logger.log("addContactToUserContacts catch, error:", error);
    errorThrower(error, error);
  }
};

const updateOneContact = async (
  currentUser = userInitialOptions,
  targetCellphone,
  editedValues
) => {
  try {
    const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder(
      currentUser.contacts,
      targetCellphone
    );
    errorThrower(!contactItem, () => getErrorObject(CONTACT_ITEM_NOT_EXIST));

    currentUser.contacts.splice(cellphoneIndex, 1, {
      ...userProps.makeContactByParam(targetCellphone),
      firstName: editedValues.firstName,
      lastName: editedValues.lastName,
    });
    await currentUser.updateOne({
      contacts: currentUser.contacts,
    });

    return { currentUser };
  } catch (error) {
    logger.log("updateOneContact catch, error:", error);
    errorThrower(error, error);
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
  errorThrower(!blacklistItem, () => getErrorObject(BLACKLIST_ITEM_NOT_EXIST));

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
    errorThrower(!contactItem, () =>
      getErrorObject(CONTACT_ITEM_NOT_EXIST, { targetUserData })
    );

    currentUser.contacts.splice(cellphoneIndex, 1);
    await currentUser.updateOne({
      contacts: currentUser.contacts,
    });
  } catch (error) {
    logger.log("removeContactItem catch, error:", error);
    errorThrower(error, error);
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

    errorThrower(error, error);
  }
};

const createNewNormalUser = async (userData) => {
  try {
    const newUser = new UserMongoModel(userData);
    await newUser.save();

    return true;
  } catch (error) {
    logger.log("createNewNormalUser catch, error:", error);
    errorThrower(error, error);
  }
};

const addTestUser = async (
  countryCode,
  countryName,
  phoneNumber,
  firstName,
  lastName,
  privateId,
  mainToken
) => {
  try {
    const user = await UserMongoModel.findOneAndUpdate(
      { countryCode, countryName, phoneNumber },
      {
        tokens: [{ mainToken }],
        privateId,
        firstName,
        lastName,
        contacts: [],
        blacklist: [],
        chats: [],
      },
      {
        upsert: true,
        lean: true,
        new: true,
      }
    );

    return user;
  } catch (error) {
    logger.log("addTestUser catch, error:", error);
    errorThrower(error, error);
  }
};

const getAllChats = (currentUser) => {
  return currentUser.chats.map((chat) => ({ chatId: chat.chatId }));
};

const getAllUsers = async () => {
  const users = await UserMongoModel.find();

  return users;
};

const getUserData = async (privateId) => {
  try {
    const user = await UserMongoModel.findOne({ privateId }, undefined, {
      lean: true,
    });

    errorThrower(!user, () =>
      getErrorObject(USER_NOT_EXIST, { searchQueries: { privateId } })
    );

    return user;
  } catch (error) {
    logger.log("getUserData catch, error:", error);
    throw error;
  }
};

const removeTestUsers = async (length) => {
  for (let i = 0; i < length; i++) {
    await UserMongoModel.remove();
  }
};

module.exports = {
  addCellphoneToUserBlacklist,
  addContactToUserContacts,
  addTestUser,
  createNewNormalUser,
  deleteBlacklistItem,
  getAllChats,
  getAllUsers,
  getUserContacts,
  getUserData,
  removeContactItem,
  removeTestUsers,
  updateOneContact,
  updateUserDataByPrivateId,
  userFinder,
};
