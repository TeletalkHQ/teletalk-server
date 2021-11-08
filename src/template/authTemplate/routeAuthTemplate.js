//* Using in routers and controllers

const routeAuthTemplate = {
	baseRoute: "/auth",

	login: {
		route: "/login/",
		description: "Use for login user as normal account",
	},
	registerNormal: {
		route: "/register/normal/",
		description: "Use for register permanent account for normal user",
	},
	registerAnonymous: {
		route: "/register/anonymous/",
		description: "Use for register temporary account for user and maybe a bot!",
	},
	verify: {
		route: "/verify/",
		description:
			"Use for verify login (normal account) and register (both mode)",
	},
	logoutNormal: {
		route: "/logout/normal",
		description: "Use for logout user from normal account",
	},
	logoutAnonymous: {
		route: "/logout/anonymous",
		description: "Use for burn user anonymous account (every footprint)",
	},

	error: {
		route: "/error/",
		description: "Use for get all user properties and value structure",
	},
	template: {
		route: "/template/",
		description: "Use for get all user properties and value structure",
	},
};

module.exports = { routeAuthTemplate };
