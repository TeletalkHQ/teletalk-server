const { addBlock } = require("@/controllers/cellphone/addBlock");
const { addContact } = require("@/controllers/cellphone/addContact");
const { editContact } = require("@/controllers/cellphone/editContact");
const { getContacts } = require("@/controllers/cellphone/getContacts");
const { removeBlock } = require("@/controllers/cellphone/removeBlock");
const { removeContact } = require("@/controllers/cellphone/removeContact");

const { getCountries } = require("@/controllers/other/getCountries");
const { getWelcomeMessage } = require("@/controllers/other/getWelcomeMessage");

const {
  getAllPrivateChats,
} = require("@/controllers/privateChat/getAllPrivateChats");
const { getMessages } = require("@/controllers/privateChat/getMessages");
const { sendMessage } = require("@/controllers/privateChat/sendMessage");

const { getAllUsers } = require("@/controllers/test/getAllUsers");

const { checkUserStatus } = require("@/controllers/user/checkUserStatus");
const { createNewUser } = require("@/controllers/user/createNewUser");
const { getUserData } = require("@/controllers/user/getUserData");
const { logoutNormal } = require("@/controllers/user/logoutNormal");
const { signInNormal } = require("@/controllers/user/signInNormal");
const { updatePersonalInfo } = require("@/controllers/user/updatePersonalInfo");
const { verifySignInNormal } = require("@/controllers/user/verifySignInNormal");

const { getAllStuff } = require("@/controllers/versionControl/getAllStuff");
const {
  chatsLastMessage,
} = require("@/controllers/privateChat/chatsLastMessage");

const controllers = {
  addBlock,
  addContact,
  chatsLastMessage,
  checkUserStatus,
  createNewUser,
  editContact,
  getAllPrivateChats,
  getAllStuff,
  getAllUsers,
  getContacts,
  getCountries,
  getMessages,
  getUserData,
  getWelcomeMessage,
  logoutNormal,
  removeBlock,
  removeContact,
  sendMessage,
  signInNormal,
  updatePersonalInfo,
  verifySignInNormal,
};

module.exports = { controllers };
