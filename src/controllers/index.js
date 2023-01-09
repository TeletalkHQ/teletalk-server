const { createNewUser } = require("@/controllers/auth/createNewUser");
const { logout } = require("@/controllers/auth/logout");
const { signIn } = require("@/controllers/auth/signIn");
const { verify } = require("@/controllers/auth/verify");

const { getCountries } = require("@/controllers/other/getCountries");
const { getWelcomeMessage } = require("@/controllers/other/getWelcomeMessage");

const { getPrivateChat } = require("@/controllers/privateChat/getPrivateChat");
const {
  getAllPrivateChats,
} = require("@/controllers/privateChat/getAllPrivateChats");
const {
  sendPrivateMessage,
} = require("@/controllers/privateChat/sendPrivateMessage");

const { getAllStuff } = require("@/controllers/stuff/getAllStuff");

const { addBlock } = require("@/controllers/user/addBlock");
const { addContact } = require("@/controllers/user/addContact");
const { editContact } = require("@/controllers/user/editContact");
const { getContacts } = require("@/controllers/user/getContacts");
const { getCurrentUserData } = require("@/controllers/user/getCurrentUserData");
const { getPublicUserData } = require("@/controllers/user/getPublicUserData");
const { removeBlock } = require("@/controllers/user/removeBlock");
const { removeContact } = require("@/controllers/user/removeContact");
const { updatePersonalInfo } = require("@/controllers/user/updatePersonalInfo");

const controllers = {
  addBlock,
  addContact,
  createNewUser,
  editContact,
  getAllPrivateChats,
  getAllStuff,
  getContacts,
  getCountries,
  getCurrentUserData,
  getPrivateChat,
  getPublicUserData,
  getWelcomeMessage,
  logout,
  removeBlock,
  removeContact,
  sendPrivateMessage,
  signIn,
  updatePersonalInfo,
  verify,
};

module.exports = { controllers };
