const { addBlock } = require("@/services/user/addBlock");
const { addContact } = require("@/services/user/addContact");
const { createNewUser } = require("@/services/user/createNewUser");
const { getAllUsers } = require("@/services/user/getAllUsers");
const { getUserContacts } = require("@/services/user/getUserContacts");
const { getUserData } = require("@/services/user/getUserData");
const { logout } = require("@/services/user/logout");
const { removeBlock } = require("@/services/user/removeBlock");
const { removeContact } = require("@/services/user/removeContact");
const { addNewToken } = require("@/services/user/addNewToken");
const { updateContact } = require("@/services/user/updateContact");
const { updatePersonalInfo } = require("@/services/user/updatePersonalInfo");

const userServices = {
  addBlock,
  addContact,
  createNewUser,
  getAllUsers,
  getUserContacts,
  getUserData,
  logout,
  removeBlock,
  removeContact,
  addNewToken,
  updateContact,
  updatePersonalInfo,
};

module.exports = {
  userServices,
};
