const { addBlock } = require("@/services/user/addBlock");
const { addContact } = require("@/services/user/addContact");
const { addNewSession } = require("@/services/user/addNewSession");
const { getAllUsers } = require("@/services/user/getAllUsers");
const { getUserContacts } = require("@/services/user/getUserContacts");
const {
  getCurrentUserData,
  getTargetUserData,
} = require("@/services/user/getUserData");
const { removeBlock } = require("@/services/user/removeBlock");
const { removeContact } = require("@/services/user/removeContact");
const { updateContact } = require("@/services/user/updateContact");
const { updatePersonalInfo } = require("@/services/user/updatePersonalInfo");

const userServices = {
  addBlock,
  addContact,
  addNewSession,
  getAllUsers,
  getCurrentUserData,
  getTargetUserData,
  getUserContacts,
  removeBlock,
  removeContact,
  updateContact,
  updatePersonalInfo,
};

module.exports = {
  userServices,
};
