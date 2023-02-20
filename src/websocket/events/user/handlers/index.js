const { addBlock } = require("@/websocket/events/user/handlers/addBlock");
const { addContact } = require("@/websocket/events/user/handlers/addContact");
const { disconnect } = require("@/websocket/events/user/handlers/disconnect");
const { editContact } = require("@/websocket/events/user/handlers/editContact");
const { getContacts } = require("@/websocket/events/user/handlers/getContacts");
const { removeBlock } = require("@/websocket/events/user/handlers/removeBlock");
const {
  removeContact,
} = require("@/websocket/events/user/handlers/removeContact");
const {
  updateOnlineStatus,
} = require("@/websocket/events/user/handlers/updateOnlineStatus");

const userHandlers = {
  addBlock,
  addContact,
  disconnect,
  editContact,
  getContacts,
  removeBlock,
  removeContact,
  updateOnlineStatus,
};

module.exports = {
  userHandlers,
};
