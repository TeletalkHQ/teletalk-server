const { createPrivateChat } = require("@/services/chat/createPrivateChat");
const { findPrivateChat } = require("@/services/chat/findPrivateChat");
const { findOnePrivateChat } = require("@/services/chat/findOnePrivateChat");
const {
  findPrivateChatByParticipantId,
} = require("@/services/chat/findPrivateChatByParticipantId");
const {
  findOnePrivateChatByChatId,
} = require("@/services/chat/findOnePrivateChatByChatId");
const { sendPrivateMessage } = require("@/services/chat/sendPrivateMessage");

const chatServices = {
  createPrivateChat,
  findOnePrivateChat,
  findPrivateChat,
  findOnePrivateChatByChatId,
  findPrivateChatByParticipantId,
  sendPrivateMessage,
};

module.exports = { chatServices };
