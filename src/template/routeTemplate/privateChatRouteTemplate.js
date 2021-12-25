const privateChatRouteTemplate = {
	baseRoute: {
		route: "/chat/private",
		version: "1.0.0",
	},

	getMessages: {
		description: "Use for Start new chat",
		route: "/get/messages",
		version: "1.0.0",
	},
	startChat: {
		description: "Use for Start new chat",
		route: "/start/chat",
		version: "1.0.0",
	},
	sendMessage: {
		description: "Use for send private messages",
		route: "/send/message",
		version: "1.0.0",
	},

	error: {
		description: "Use for get all auth errors",
		route: "/error",
		version: "1.0.0",
	},
	template: {
		description: "Use for get all user properties and value structure",
		route: "/template",
		version: "1.0.0",
	},

	version: "1.0.0",
};

module.exports = { privateChatRouteTemplate };
