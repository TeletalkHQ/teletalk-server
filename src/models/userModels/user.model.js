const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");
const {
  modelPropertyGenerator,
  modelGenerator,
} = require("~/functions/utilities/generators");
const { skipParams } = require("~/functions/utilities/utils");
const { errorThrower } = require("~/functions/utilities/utils");

const { commonModel } = require("~/models/commonModels/common.model");

const { UserModel } = require("~/models/userModels/user.mongo");

const {
  initialOptions,
} = require("~/variables/constants/initialOptions/initialOptions");

const {
  userErrorTemplate: {
    BIO_INVALID_TYPE: { properties: BIO_INVALID_TYPE },
    BIO_MAXLENGTH_REACH: { properties: BIO_MAXLENGTH_REACH },
    BIO_MINLENGTH_REACH: { properties: BIO_MINLENGTH_REACH },
    BLACKLIST_INVALID_TYPE: { properties: BLACKLIST_INVALID_TYPE },
    CONTACT_INVALID_TYPE: { properties: CONTACT_INVALID_TYPE },
    COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
    COUNTRY_CODE_MAXLENGTH_REACH: { properties: COUNTRY_CODE_MAXLENGTH_REACH },
    COUNTRY_CODE_MINLENGTH_REACH: { properties: COUNTRY_CODE_MINLENGTH_REACH },
    COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
    COUNTRY_NAME_INVALID_TYPE: { properties: COUNTRY_NAME_INVALID_TYPE },
    COUNTRY_NAME_MAXLENGTH_REACH: { properties: COUNTRY_NAME_MAXLENGTH_REACH },
    COUNTRY_NAME_MINLENGTH_REACH: { properties: COUNTRY_NAME_MINLENGTH_REACH },
    COUNTRY_NAME_REQUIRED: { properties: COUNTRY_NAME_REQUIRED },
    FIRST_NAME_INVALID_TYPE: { properties: FIRST_NAME_INVALID_TYPE },
    FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
    FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
    FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
    LAST_NAME_INVALID_TYPE: { properties: LAST_NAME_INVALID_TYPE },
    LAST_NAME_MAXLENGTH_REACH: { properties: LAST_NAME_MAXLENGTH_REACH },
    LAST_NAME_MINLENGTH_REACH: { properties: LAST_NAME_MINLENGTH_REACH },
    MAC_ADDRESS_EXIST: { properties: MAC_ADDRESS_EXIST },
    MAC_ADDRESS_INVALID_TYPE: { properties: MAC_ADDRESS_INVALID_TYPE },
    MAC_ADDRESS_MAXLENGTH_REACH: { properties: MAC_ADDRESS_MAXLENGTH_REACH },
    MAC_ADDRESS_MINLENGTH_REACH: { properties: MAC_ADDRESS_MINLENGTH_REACH },
    MAC_ADDRESS_REQUIRED: { properties: MAC_ADDRESS_REQUIRED },
    PHONE_NUMBER_EXIST: { properties: PHONE_NUMBER_EXIST },
    PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
    PHONE_NUMBER_MAXLENGTH_REACH: { properties: PHONE_NUMBER_MAXLENGTH_REACH },
    PHONE_NUMBER_MINLENGTH_REACH: { properties: PHONE_NUMBER_MINLENGTH_REACH },
    PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
    PRIVATE_ID_EXIST: { properties: PRIVATE_ID_EXIST },
    PRIVATE_ID_INVALID_TYPE: { properties: PRIVATE_ID_INVALID_TYPE },
    PRIVATE_ID_MAX_LENGTH_REACH: { properties: PRIVATE_ID_MAX_LENGTH_REACH },
    PRIVATE_ID_MIN_LENGTH_REACH: { properties: PRIVATE_ID_MIN_LENGTH_REACH },
    PRIVATE_ID_REQUIRED: { properties: PRIVATE_ID_REQUIRED },
    TOKEN_EXIST: { properties: TOKEN_EXIST },
    TOKEN_INVALID_TYPE: { properties: TOKEN_INVALID_TYPE },
    TOKEN_REQUIRED: { properties: TOKEN_REQUIRED },
    USERNAME_EXIST: { properties: USERNAME_EXIST },
    USERNAME_INVALID_TYPE: { properties: USERNAME_INVALID_TYPE },
    USERNAME_MAXLENGTH_REACH: { properties: USERNAME_MAXLENGTH_REACH },
    USERNAME_MINLENGTH_REACH: { properties: USERNAME_MINLENGTH_REACH },
    VERIFICATION_CODE_INVALID_LENGTH: {
      properties: VERIFICATION_CODE_INVALID_LENGTH,
    },
    VERIFICATION_CODE_INVALID_TYPE: {
      properties: VERIFICATION_CODE_INVALID_TYPE,
    },
  },
  userErrorTemplate,
} = require("~/variables/errors/userErrorTemplate");

const { userInitialOptions } = initialOptions;

const bioModel = modelGenerator(
  modelPropertyGenerator(255, BIO_MAXLENGTH_REACH),
  modelPropertyGenerator(1, BIO_MINLENGTH_REACH),
  modelPropertyGenerator(false),
  null,
  modelPropertyGenerator("string", BIO_INVALID_TYPE),
  null,
  modelPropertyGenerator(""),
  "1.0.0"
);

const blacklistModel = modelGenerator(
  ...skipParams(4),
  modelPropertyGenerator("array", BLACKLIST_INVALID_TYPE),
  null,
  modelPropertyGenerator([]),
  "1.0.0"
);

const contactsModel = modelGenerator(
  modelPropertyGenerator(14),
  modelPropertyGenerator(10),
  modelPropertyGenerator(false),
  null,
  modelPropertyGenerator("array", CONTACT_INVALID_TYPE),
  null,
  modelPropertyGenerator([]),
  "1.0.0"
);

const countryCodeModel = modelGenerator(
  modelPropertyGenerator(8, COUNTRY_CODE_MAXLENGTH_REACH),
  modelPropertyGenerator(2, COUNTRY_CODE_MINLENGTH_REACH),
  modelPropertyGenerator(true, COUNTRY_CODE_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", COUNTRY_CODE_INVALID_TYPE),
  ...skipParams(2),
  "1.0.0"
);

const countryNameModel = modelGenerator(
  modelPropertyGenerator(32, COUNTRY_NAME_MAXLENGTH_REACH),
  modelPropertyGenerator(2, COUNTRY_NAME_MINLENGTH_REACH),
  modelPropertyGenerator(true, COUNTRY_NAME_REQUIRED),
  null,
  modelPropertyGenerator("string", COUNTRY_NAME_INVALID_TYPE),
  ...skipParams(2),
  "1.0.0"
);

const createdAtModel = commonModel.createdAt;

const firstNameModel = modelGenerator(
  modelPropertyGenerator(18, FIRST_NAME_MAXLENGTH_REACH),
  modelPropertyGenerator(1, FIRST_NAME_MINLENGTH_REACH),
  modelPropertyGenerator(true, FIRST_NAME_REQUIRED),
  modelPropertyGenerator(false),
  modelPropertyGenerator("string", FIRST_NAME_INVALID_TYPE),
  skipParams(2),

  "1.0.0"
);

const lastNameModel = modelGenerator(
  modelPropertyGenerator(18, LAST_NAME_MAXLENGTH_REACH),
  modelPropertyGenerator(1, LAST_NAME_MINLENGTH_REACH),
  [false],
  modelPropertyGenerator(false),
  modelPropertyGenerator("string", LAST_NAME_INVALID_TYPE),
  null,
  modelPropertyGenerator(""),
  "1.0.0"
);

const macAddressModel = modelGenerator(
  modelPropertyGenerator(16, MAC_ADDRESS_MAXLENGTH_REACH),
  modelPropertyGenerator(12, MAC_ADDRESS_MINLENGTH_REACH),
  modelPropertyGenerator(true, MAC_ADDRESS_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", MAC_ADDRESS_INVALID_TYPE),
  modelPropertyGenerator(true, MAC_ADDRESS_EXIST),
  null,
  "1.0.0"
);

const phoneNumberModel = modelGenerator(
  modelPropertyGenerator(14, PHONE_NUMBER_MAXLENGTH_REACH),
  modelPropertyGenerator(10, PHONE_NUMBER_MINLENGTH_REACH),
  modelPropertyGenerator(true, PHONE_NUMBER_REQUIRED),
  null,
  modelPropertyGenerator("string", PHONE_NUMBER_INVALID_TYPE),
  modelPropertyGenerator(true, PHONE_NUMBER_EXIST),
  null,
  "1.0.0"
);

const privateIDModel = modelGenerator(
  modelPropertyGenerator(35, PRIVATE_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(30, PRIVATE_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, PRIVATE_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", PRIVATE_ID_INVALID_TYPE),
  modelPropertyGenerator(true, PRIVATE_ID_EXIST),
  null,
  "1.0.0"
);

const tokenModel = modelGenerator(
  ...skipParams(2),
  modelPropertyGenerator(true, TOKEN_REQUIRED),
  null,
  modelPropertyGenerator("string", TOKEN_INVALID_TYPE),
  modelPropertyGenerator(true, TOKEN_EXIST),
  null,
  "1.0.0"
);

const usernameModel = modelGenerator(
  modelPropertyGenerator(12, USERNAME_MAXLENGTH_REACH),
  modelPropertyGenerator(4, USERNAME_MINLENGTH_REACH),
  modelPropertyGenerator(false),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", USERNAME_INVALID_TYPE),
  modelPropertyGenerator(false, USERNAME_EXIST),
  modelPropertyGenerator(""),
  "1.0.0",
  modelPropertyGenerator(true)
);

const verificationCodeModel = modelGenerator(
  ...skipParams(3),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", VERIFICATION_CODE_INVALID_TYPE),
  ...skipParams(2),
  "1.0.0",
  null,
  modelPropertyGenerator(6, VERIFICATION_CODE_INVALID_LENGTH)
);

const userFinder = async (
  userData = initialOptions,
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
      ...userErrorTemplate.USER_NOT_EXIST,
    });

    const { cellphone: existBlacklistItem } = cellphoneFinder(
      currentUser.blacklist,
      targetUserData
    );
    errorThrower(existBlacklistItem, {
      ...targetUserData,
      ...userErrorTemplate.BLACKLIST_ITEM_EXIST,
    });

    const targetUser = await userFinder(targetUserData);
    errorThrower(targetUser === null, {
      ...targetUserData,
      ...userErrorTemplate.TARGET_USER_NOT_EXIST,
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
    ...userErrorTemplate.USER_NOT_EXIST,
  });

  const { cellphone: existContactItem } = cellphoneFinder(
    currentUser.contacts,
    targetUserData
  );
  errorThrower(existContactItem, {
    ...targetUserData,
    ...userErrorTemplate.CONTACT_ITEM_EXIST,
  });

  const targetUser = await userFinder(targetUserData);
  errorThrower(targetUser === null, {
    ...targetUserData,
    ...userErrorTemplate.TARGET_USER_NOT_EXIST,
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
    errorThrower(!currentUser, userErrorTemplate.USER_NOT_EXIST);

    const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder(
      currentUser.contacts,
      targetUserData
    );
    errorThrower(!contactItem, userErrorTemplate.CONTACT_ITEM_NOT_EXIST);

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
    errorThrower(!currentUser, userErrorTemplate.USER_NOT_EXIST);

    return currentUser.contacts;
  } catch (error) {
    logger.log("getUserContacts catch, error:", error);
  }
};

const deleteBlacklistItem = async (currentUserData, targetUserData) => {
  const currentUser = userFinder(currentUserData);
  errorThrower(!currentUser, userErrorTemplate.USER_NOT_EXIST);

  const { cellphone: blacklistItem, cellphoneIndex } = cellphoneFinder(
    currentUser.blacklist,
    targetUserData
  );
  errorThrower(!blacklistItem, userErrorTemplate.BLACKLIST_ITEM_NOT_EXIST);

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
    errorThrower(!currentUser, userErrorTemplate.USER_NOT_EXIST);

    const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder(
      currentUser.contacts,
      targetUserData
    );
    errorThrower(!contactItem, userErrorTemplate.CELLPHONE_NOT_EXIST);

    currentUser.contacts.splice(cellphoneIndex, 1);
    await currentUser.updateOne({
      contacts: currentUser.contacts,
    });
  } catch (error) {
    logger.log("removeContactItem catch, error:", error);
    throw error;
  }
};

const userModel = {
  version: "1.0.0",

  bioModel,
  blacklistModel,
  contactsModel,
  countryCodeModel,
  countryNameModel,
  createdAtModel,
  firstNameModel,
  lastNameModel,
  macAddressModel,
  phoneNumberModel,
  privateIDModel,
  tokenModel,
  usernameModel,
  verificationCodeModel,
};

module.exports = {
  userModel,

  addContactToUserBlacklist,
  addContactToUserContacts,
  updateOneContact,
  getUserContacts,
  deleteBlacklistItem,
  removeContactItem,
};
