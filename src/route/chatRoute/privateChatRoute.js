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
		sendMessage,
		startChat,
		getMessages,
		getAllChats,
		chatsLastMessage,
	},
} = require("~/template/routeTemplate/privateChatRouteTemplate");

const privateChatRoute = Router();

privateChatRoute.use(authDefaultMDW);

privateChatRoute.use(findUserFromDB);

privateChatRoute[getAllChats.properties.method](
	getAllChats.properties.route,
	getAllChatsUserController,
);

privateChatRoute[chatsLastMessage.properties.method](
	chatsLastMessage.properties.route,
	chatsLastMessageChatController,
);

privateChatRoute[sendMessage.properties.method](
	sendMessage.properties.route,
	sendMessagePrivateChatController,
);
privateChatRoute[getMessages.properties.method](
	getMessages.properties.route,
	getMessagesPrivateChatController,
);
privateChatRoute[startChat.properties.method](
	startChat.properties.route,
	startChatPrivateChatController,
);

module.exports = { privateChatRoute };
