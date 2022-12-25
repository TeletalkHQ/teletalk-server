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

const { getCurrentUserData } = require("@/controllers/user/getCurrentUserData");
const { createNewUser } = require("@/controllers/user/createNewUser");
const { getPublicUserData } = require("@/controllers/user/getPublicUserData");
const { getTargetUserData } = require("@/controllers/user/getTargetUserData");
const { logout } = require("@/controllers/user/logout");
const { signIn } = require("@/controllers/user/signIn");
const { updatePersonalInfo } = require("@/controllers/user/updatePersonalInfo");
const { verify } = require("@/controllers/user/verify");

const { getAllStuff } = require("@/controllers/stuff/getAllStuff");

const controllers = {
  addBlock,
  addContact,
  createNewUser,
  editContact,
  getAllPrivateChats,
  getAllStuff,
  getContacts,
  getCountries,
  getPrivateChat,
  getPublicUserData,
  getTargetUserData,
  getCurrentUserData,
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
