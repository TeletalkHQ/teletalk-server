const { addBlock } = require("@/websocket/events/user/handlers/addBlock");
const { addContact } = require("@/websocket/events/user/handlers/addContact");
const { disconnect } = require("@/websocket/events/user/handlers/disconnect");
const { editContact } = require("@/websocket/events/user/handlers/editContact");
const {
  updateOnlineStatus,
} = require("@/websocket/events/user/handlers/updateOnlineStatus");

const userHandlers = {
  addBlock,
  addContact,
  disconnect,
  editContact,
  updateOnlineStatus,
};

module.exports = {
  userHandlers,
};
