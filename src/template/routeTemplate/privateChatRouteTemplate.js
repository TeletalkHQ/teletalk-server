const baseRoute = {
	properties: { route: "/chat/private" },
	info: {
		version: "1.0.0",
	},
};

const getMessages = {
	properties: { description: "Use for Start new chat", route: "/get/messages" },
	info: {
		version: "1.0.0",
	},
};

const startChat = {
	properties: { description: "Use for Start new chat", route: "/start/chat" },
	info: {
		version: "1.0.0",
	},
};

const sendMessage = {
	properties: { description: "Use for send private messages", route: "/send/message" },
	info: {
		version: "1.0.0",
	},
};

const error = {
	properties: { description: "Use for get all auth errors", route: "/error" },
	info: {
		version: "1.0.0",
	},
};

const template = {
	properties: {
		description: "Use for get all user properties and value structure",
		route: "/template",
	},
	info: {
		version: "1.0.0",
	},
};

const privateChatRouteTemplate = {
	info: {
		version: "1.0.0",
	},

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
