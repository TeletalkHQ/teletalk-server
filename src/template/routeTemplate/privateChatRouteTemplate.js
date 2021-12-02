const privateChatRouteTemplate = {
	baseRoute: "/chat/private",

	sendMessage: {
		description: "Use for send private messages",
		route: "send/message",
	},

	error: {
		description: "Use for get all auth errors",
		route: "/error",
	},
	template: {
		description: "Use for get all user properties and value structure",
		route: "/template",
	},
};

module.exports = { privateChatRouteTemplate };
