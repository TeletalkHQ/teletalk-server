const { createNewUser } = require("@/http/controllers/auth/createNewUser");
const { logout } = require("@/http/controllers/auth/logout");
const { signIn } = require("@/http/controllers/auth/signIn");
const { verify } = require("@/http/controllers/auth/verify");

const { getCountries } = require("@/http/controllers/other/getCountries");
const {
  getWelcomeMessage,
} = require("@/http/controllers/other/getWelcomeMessage");

const { getAllStuff } = require("@/http/controllers/stuff/getAllStuff");

const {
  getCurrentUserData,
} = require("@/http/controllers/user/getCurrentUserData");
const {
  getPublicUserData,
} = require("@/http/controllers/user/getPublicUserData");
const {
  updatePublicUserData,
} = require("@/http/controllers/user/updatePublicUserData");

const controllers = {
  createNewUser,
  getAllStuff,
  getCountries,
  getCurrentUserData,
  getPublicUserData,
  getWelcomeMessage,
  logout,
  signIn,
  updatePublicUserData,
  verify,
};

module.exports = { controllers };
