const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { findUserFromDB } = require("~/middleware/findUserFromDB");

const {
	sendMessagePrivateChatController,
} = require("~/controller/privateChatController/sendMessagePrivateChatController");
const {
	startChatPrivateChatController,
} = require("~/controller/privateChatController/startChatPrivateChatController");
const {
	getMessagesPrivateChatController,
} = require("~/controller/privateChatController/getMessagesPrivateChatController");
const {
	chatsLastMessageChatController,
} = require("~/controller/privateChatController/chatsLastMessageChatController");
const {
	getAllChatsUserController,
} = require("~/controller/privateChatController/getAllChatsUserController");

const {
	privateChatRouteTemplate: {
		sendMessage: { properties: sendMessage },
		startChat: { properties: startChat },
		getMessages: { properties: getMessages },
		getAllChats: { properties: getAllChats },
		chatsLastMessage: { properties: chatsLastMessage },
	},
} = require("~/template/routeTemplate/privateChatRouteTemplate");

const privateChatRoute = Router();

privateChatRoute.use(authDefaultMDW);

privateChatRoute.use(findUserFromDB);

privateChatRoute[getAllChats.method](getAllChats.route, getAllChatsUserController);

privateChatRoute[chatsLastMessage.method](
	chatsLastMessage.route,
	chatsLastMessageChatController,
);

privateChatRoute[sendMessage.method](sendMessage.route, sendMessagePrivateChatController);
privateChatRoute[getMessages.method](getMessages.route, getMessagesPrivateChatController);
privateChatRoute[startChat.method](startChat.route, startChatPrivateChatController);

module.exports = { privateChatRoute };
