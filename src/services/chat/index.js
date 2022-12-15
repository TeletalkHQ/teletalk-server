const { getAllPrivateChats } = require("@/services/chat/getAllPrivateChats");
const { getPrivateChat } = require("@/services/chat/getPrivateChat");
const { sendPrivateMessage } = require("@/services/chat/sendPrivateMessage");

const chatServices = {
  getAllPrivateChats,
  getPrivateChat,
  sendPrivateMessage,
};

module.exports = { chatServices };
