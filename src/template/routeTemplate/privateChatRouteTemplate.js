const baseRoute = {
	route: "/chat/private",
	version: "1.0.0",
};

const getMessages = {
	description: "Use for Start new chat",
	route: "/get/messages",
	version: "1.0.0",
};

const startChat = {
	description: "Use for Start new chat",
	route: "/start/chat",
	version: "1.0.0",
};

const sendMessage = {
	description: "Use for send private messages",
	route: "/send/message",
	version: "1.0.0",
};

const error = {
	description: "Use for get all auth errors",
	route: "/error",
	version: "1.0.0",
};

const template = {
	description: "Use for get all user properties and value structure",
	route: "/template",
	version: "1.0.0",
};

const privateChatRouteTemplate = {
	version: "1.0.0",

	baseRoute,
	getMessages,
	startChat,
	sendMessage,
	error,
	template,
};

module.exports = {
	privateChatRouteTemplate,

	baseRoute,
	getMessages,
	startChat,
	sendMessage,
	error,
	template,
};
