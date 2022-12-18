const { addBlock } = require("@/controllers/cellphone/addBlock");
const { addContact } = require("@/controllers/cellphone/addContact");
const { editContact } = require("@/controllers/cellphone/editContact");
const { getContacts } = require("@/controllers/cellphone/getContacts");
const { removeBlock } = require("@/controllers/cellphone/removeBlock");
const { removeContact } = require("@/controllers/cellphone/removeContact");

const { getCountries } = require("@/controllers/other/getCountries");
const { getWelcomeMessage } = require("@/controllers/other/getWelcomeMessage");

const { getPrivateChat } = require("@/controllers/privateChat/getPrivateChat");
const {
  getAllPrivateChats,
} = require("@/controllers/privateChat/getAllPrivateChats");
const {
  sendPrivateMessage,
} = require("@/controllers/privateChat/sendPrivateMessage");

const {
  getChatsLastMessage,
} = require("@/controllers/privateChat/getChatsLastMessage");

const { getUserData } = require("@/controllers/user/getUserData");
const { createNewUser } = require("@/controllers/user/createNewUser");
const { getPublicUserInfo } = require("@/controllers/user/getPublicUserInfo");
const { getTargetUserData } = require("@/controllers/user/getTargetUserData");
const { logout } = require("@/controllers/user/logout");
const { signIn } = require("@/controllers/user/signIn");
const { updatePersonalInfo } = require("@/controllers/user/updatePersonalInfo");
const { verifySignIn } = require("@/controllers/user/verifySignIn");

const { getAllStuff } = require("@/controllers/stuff/getAllStuff");

const controllers = {
  addBlock,
  addContact,
  createNewUser,
  editContact,
  getAllPrivateChats,
  getAllStuff,
  getChatsLastMessage,
  getContacts,
  getCountries,
  getPrivateChat,
  getPublicUserInfo,
  getTargetUserData,
  getUserData,
  getWelcomeMessage,
  logout,
  removeBlock,
  removeContact,
  sendPrivateMessage,
  signIn,
  updatePersonalInfo,
  verifySignIn,
};

module.exports = { controllers };
