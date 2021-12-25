const cellphoneRouteTemplate = {
	baseRoute: {
		route: "/cellphone",
		version: "1.0.0",
	},

	addBlock: {
		description: "Use for block single contact on user contacts list",
		route: "/add/block",
		version: "1.0.0",
	},
	addBlocks: {
		description: "Use for block single contact on user contacts list",
		route: "/add/blocks",
		version: "1.0.0",
	},
	addContact: {
		description: "Use for add single contact to current user contacts list",
		route: "/add/contact",
		version: "1.0.0",
	},
	addContacts: {
		description: "Use for add single contact to current user contacts list",
		route: "/add/contacts",
		version: "1.0.0",
	},
	editBlock: {
		description: "User for edit single contact on user contacts list",
		route: "/edit/block",
		version: "1.0.0",
	},
	editContact: {
		description: "User for edit single contact on user contacts list",
		route: "/edit/contact",
		version: "1.0.0",
	},
	removeBlock: {
		description: "Use for remove single contact on user contacts list",
		route: "/remove/block",
		version: "1.0.0",
	},
	removeBlocks: {
		description: "Use for remove single contact on user contacts list",
		route: "/remove/blocks",
		version: "1.0.0",
	},
	removeContact: {
		description: "Use for remove single contact on user contacts list",
		route: "/remove/contact",
		version: "1.0.0",
	},
	removeContacts: {
		description: "Use for remove single contact on user contacts list",
		route: "/remove/contacts",
		version: "1.0.0",
	},
	shareContact: {
		description: "Use for share single contact on user contacts list",
		route: "/share/contact",
		version: "1.0.0",
	},
	shareContacts: {
		description: "Use for share single contact on user contacts list",
		route: "/share/contacts",
		version: "1.0.0",
	},

	error: {
		description: "Use for get all contact errors",
		route: "/error",
		version: "1.0.0",
	},
	template: {
		description: "Use for get all contact properties and value structure",
		route: "/template",
		version: "1.0.0",
	},

	version: "1.0.0",
};

module.exports = { cellphoneRouteTemplate };
