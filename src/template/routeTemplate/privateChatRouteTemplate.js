const { routeTemplateGenerator } = require("~/function/utility/generators");

const baseUrl = routeTemplateGenerator(true, "/chat/private", "1.0.0", "");

const getAllChats = routeTemplateGenerator(
	"get",
	"/get/all/chats",
	"1.0.0",
	"Use for Start new chat",
);

const chatsLastMessage = routeTemplateGenerator(
	"post",
	"/chats/last/message",
	"1.0.0",
	"Use for Get chats last message",
);

const getMessages = routeTemplateGenerator(
	"post",
	"/get/messages",
	"1.0.0",
	"Use for get all messages",
);

const startChat = routeTemplateGenerator(
	"post",
	"/start/chat",
	"1.0.0",
	"Use for Start new chat",
);

const sendMessage = routeTemplateGenerator(
	"post",
	"/send/message",
	"1.0.0",
	"Use for send private messages",
);

const error = routeTemplateGenerator("get", "/error", "1.0.0", "Use for get all auth errors");

const template = routeTemplateGenerator(
	"get",
	"/template",
	"1.0.0",
	"Use for get all user properties and value structure",
);

const privateChatRouteTemplate = {
	baseUrl,
	chatsLastMessage,
	error,
	getAllChats,
	getMessages,
	sendMessage,
	startChat,
	template,
	version: "1.0.0",
};

module.exports = {
	privateChatRouteTemplate,
};
