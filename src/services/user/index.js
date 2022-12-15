const {
  addCellphoneToUserBlacklist,
} = require("@/services/user/addCellphoneToUserBlacklist");
const {
  addContactToUserContacts,
} = require("@/services/user/addContactToUserContacts");
const { createNewUser } = require("@/services/user/createNewUser");
const { getAllUsers } = require("@/services/user/getAllUsers");
const { getUserContacts } = require("@/services/user/getUserContacts");
const { getUserData } = require("@/services/user/getUserData");
const { logoutUser } = require("@/services/user/logoutUser");
const { removeBlacklistItem } = require("@/services/user/removeBlacklistItem");
const { removeContactItem } = require("@/services/user/removeContactItem");
const { saveNewToken } = require("@/services/user/saveNewToken");
const { updateContact } = require("@/services/user/updateContact");
const { updatePersonalInfo } = require("@/services/user/updatePersonalInfo");

const userServices = {
  addCellphoneToUserBlacklist,
  addContactToUserContacts,
  createNewUser,
  getAllUsers,
  getUserContacts,
  getUserData,
  logoutUser,
  removeBlacklistItem,
  removeContactItem,
  saveNewToken,
  updateContact,
  updatePersonalInfo,
};

module.exports = {
  userServices,
};
