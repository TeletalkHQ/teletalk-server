const { addBlock } = require("@/websocket/events/user/handlers/addBlock");
const { addContact } = require("@/websocket/events/user/handlers/addContact");
const { disconnect } = require("@/websocket/events/user/handlers/disconnect");
const {
  updateOnlineStatus,
} = require("@/websocket/events/user/handlers/updateOnlineStatus");

const userHandlers = {
  addBlock,
  addContact,
  disconnect,
  updateOnlineStatus,
};

module.exports = {
  userHandlers,
};
