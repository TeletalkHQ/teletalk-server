const { createNewUser } = require("@/http/controllers/auth/createNewUser");
const { logout } = require("@/http/controllers/auth/logout");
const { signIn } = require("@/http/controllers/auth/signIn");
const { verify } = require("@/http/controllers/auth/verify");

const { getCountries } = require("@/http/controllers/other/getCountries");
const {
  getWelcomeMessage,
} = require("@/http/controllers/other/getWelcomeMessage");

const { getAllStuff } = require("@/http/controllers/stuff/getAllStuff");

const { editContact } = require("@/http/controllers/user/editContact");
const { getContacts } = require("@/http/controllers/user/getContacts");
const {
  getCurrentUserData,
} = require("@/http/controllers/user/getCurrentUserData");
const {
  getPublicUserData,
} = require("@/http/controllers/user/getPublicUserData");
const { removeBlock } = require("@/http/controllers/user/removeBlock");
const { removeContact } = require("@/http/controllers/user/removeContact");
const {
  updatePublicUserData,
} = require("@/http/controllers/user/updatePublicUserData");

//TODO: index
const controllers = {
  createNewUser,
  editContact,
  getAllStuff,
  getContacts,
  getCountries,
  getCurrentUserData,
  getPublicUserData,
  getWelcomeMessage,
  logout,
  removeBlock,
  removeContact,
  signIn,
  updatePublicUserData,
  verify,
};

module.exports = { controllers };
