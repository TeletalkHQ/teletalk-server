const { createNewUser } = require("@/http/controllers/auth/createNewUser");
const { logout } = require("@/http/controllers/auth/logout");
const { signIn } = require("@/http/controllers/auth/signIn");
const { verify } = require("@/http/controllers/auth/verify");

const { getCountries } = require("@/http/controllers/other/getCountries");
const {
  getWelcomeMessage,
} = require("@/http/controllers/other/getWelcomeMessage");

const { getAllStuff } = require("@/http/controllers/stuff/getAllStuff");

const controllers = {
  createNewUser,
  getAllStuff,
  getCountries,
  getWelcomeMessage,
  logout,
  signIn,
  verify,
};

module.exports = { controllers };
