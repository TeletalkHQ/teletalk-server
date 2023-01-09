const { createPrivateChat } = require("@/services/chat/createPrivateChat");
const { findPrivateChat } = require("@/services/chat/findPrivateChat");
const { findOnePrivateChat } = require("@/services/chat/findOnePrivateChat");
const {
  findPrivateChatByParticipantId,
} = require("@/services/chat/findPrivateChatByParticipantId");
const { getAllPrivateChats } = require("@/services/chat/getAllPrivateChats");
const { getPrivateChat } = require("@/services/chat/getPrivateChat");
const { sendPrivateMessage } = require("@/services/chat/sendPrivateMessage");

const chatServices = {
  createPrivateChat,
  findOnePrivateChat,
  findPrivateChat,
  findPrivateChatByParticipantId,
  getAllPrivateChats,
  getPrivateChat,
  sendPrivateMessage,
};

module.exports = { chatServices };
