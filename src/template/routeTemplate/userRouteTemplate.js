const baseRoute = {
	properties: {
		description: "",
		route: "/user",
	},
	info: {
		version: "1.0.0",
	},
};

const signInNormal = {
	properties: {
		description: "Use for sign in client as a normal account",
		method: "post",
		route: "/signIn/normal",
	},
	info: {
		version: "1.0.0",
	},
};

const statusCheck = {
	properties: {
		description: "Use for check client availability as a normal account",
		method: "get",
		route: "/status/check",
	},
	info: {
		version: "1.0.0",
	},
};

const verifySignInNormal = {
	properties: {
		description: "Use for verify sign in (normal account) as normal account",
		method: "post",
		route: "/verify/signIn/normal",
	},
	info: {
		version: "1.0.0",
	},
};

const error = {
	properties: {
		description: "Use for get all auth errors",
		method: "get",
		route: "/error",
	},
	info: {
		version: "1.0.0",
	},
};

const template = {
	properties: {
		description: "Use for get all user properties and value structure",
		method: "get",
		route: "/template",
	},
	info: {
		version: "1.0.0",
	},
};

const userRouteTemplate = {
	info: {
		version: "1.0.0",
	},

	baseRoute,
	signInNormal,
	statusCheck,
	verifySignInNormal,
	error,
	template,
};

module.exports = {
	userRouteTemplate,

	baseRoute,
	signInNormal,
	statusCheck,
	verifySignInNormal,
	error,
	template,
};
