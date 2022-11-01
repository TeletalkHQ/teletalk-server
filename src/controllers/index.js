const { addBlock } = require("@/controllers/cellphone/addBlock");
const { addContact } = require("@/controllers/cellphone/addContact");
const { editContact } = require("@/controllers/cellphone/editContact");
const { getContacts } = require("@/controllers/cellphone/getContacts");
const { removeBlock } = require("@/controllers/cellphone/removeBlock");
const { removeContact } = require("@/controllers/cellphone/removeContact");

const { getCountries } = require("@/controllers/other/getCountries");
const { getWelcomeMessage } = require("@/controllers/other/getWelcomeMessage");

const {
  getPrivateChatMessages,
} = require("@/controllers/privateChat/getPrivateChatMessages");
const {
  sendPrivateMessage,
} = require("@/controllers/privateChat/sendPrivateMessage");

const { getAllUsers } = require("@/controllers/test/getAllUsers");

const { checkUserStatus } = require("@/controllers/user/checkUserStatus");
const { createNewUser } = require("@/controllers/user/createNewUser");
const { getChatInfo } = require("@/controllers/user/getChatInfo");
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
  getAllStuff,
  getAllUsers,
  getChatInfo,
  getContacts,
  getCountries,
  getPrivateChatMessages,
  getUserData,
  getWelcomeMessage,
  logoutNormal,
  removeBlock,
  removeContact,
  sendPrivateMessage,
  signInNormal,
  updatePersonalInfo,
  verifySignInNormal,
};

module.exports = { controllers };
