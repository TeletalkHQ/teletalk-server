const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { errorResponser } = require("~/middleware/errorResponser");

const {
	sendMessagePrivateChatController,
} = require("~/controller/privateChatController/sendMessagePrivateChatController");
const {
	startChatPrivateChatController,
} = require("~/controller/privateChatController/startChatPrivateChatController");

const {
	privateChatRouteTemplate: { sendMessage, startChat },
} = require("~/template/routeTemplate/privateChatRouteTemplate");
const { findUserFromDB } = require("~/middleware/findUserFromDB");

const privateChatRoute = Router();

// privateChatRoute.use(authDefaultMDW);

// privateChatRoute.use(findUserFromDB);

// privateChatRoute.use(errorResponser);

privateChatRoute.post(sendMessage.route, sendMessagePrivateChatController);
privateChatRoute.post(startChat.route, startChatPrivateChatController);

module.exports = { privateChatRoute };
