const baseRoute = {
	route: "/user",
	version: "1.0.0",
};

const signInNormal = {
	description: "Use for sign in client as a normal account",
	route: "/signIn/normal",
	version: "1.0.0",
};

const statusCheck = {
	description: "Use for check client availability as a normal account",
	route: "/status/check",
	version: "1.0.0",
};

const verifyLoginNormal = {
	description: "Use for verify login (normal account) and register (both mode)",
	route: "/verify/login/normal",
	version: "1.0.0",
};

const verifySignInNormal = {
	description: "Use for verify sign in (normal account) as normal account",
	route: "/verify/signIn/normal",
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

const userRouteTemplate = {
	version: "1.0.0",

	baseRoute,
	signInNormal,
	statusCheck,
	verifyLoginNormal,
	verifySignInNormal,
	error,
	template,
};

module.exports = {
	userRouteTemplate,

	baseRoute,
	signInNormal,
	statusCheck,
	verifyLoginNormal,
	verifySignInNormal,
	error,
	template,
};
