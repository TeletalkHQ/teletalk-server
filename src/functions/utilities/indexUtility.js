const { myConsole } = require("~/functions/utilities/Logger");
const { objectClarify } = require("~/functions/utilities/objectClarify");
const {
  passwordGenerator,
} = require("~/functions/utilities/passwordGenerator");
const { randomID } = require("~/functions/utilities/randomID");
const { tokenSigner } = require("~/functions/utilities/tokenSigner");

module.exports = {
  myConsole,
  objectClarify,
  passwordGenerator,
  randomID,
  tokenSigner,
};
