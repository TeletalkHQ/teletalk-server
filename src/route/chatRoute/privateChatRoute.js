const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");

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
	privateChatRouteTemplate: { sendMessage, startChat, getMessages },
} = require("~/template/routeTemplate/privateChatRouteTemplate");
const { findUserFromDB } = require("~/middleware/findUserFromDB");

const privateChatRoute = Router();

privateChatRoute.use(authDefaultMDW);

privateChatRoute.use(findUserFromDB);

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
