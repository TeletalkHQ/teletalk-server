const cellphoneRouteTemplate = {
	baseRoute: "/cellphone",

	addBlock: {
		description: "Use for block single contact on user contacts list",
		route: "/add/block",
	},
	addBlocks: {
		description: "Use for block single contact on user contacts list",
		route: "/add/blocks",
	},
	addContact: {
		description: "Use for add single contact to current user contacts list",
		route: "/add/contact",
	},
	addContacts: {
		description: "Use for add single contact to current user contacts list",
		route: "/add/contacts",
	},
	editBlock: {
		description: "User for edit single contact on user contacts list",
		route: "/edit/block",
	},
	editContact: {
		description: "User for edit single contact on user contacts list",
		route: "/edit/contact",
	},
	removeBlock: {
		description: "Use for remove single contact on user contacts list",
		route: "/remove/block",
	},
	removeBlocks: {
		description: "Use for remove single contact on user contacts list",
		route: "/remove/blocks",
	},
	removeContact: {
		description: "Use for remove single contact on user contacts list",
		route: "/remove/contact",
	},
	removeContacts: {
		description: "Use for remove single contact on user contacts list",
		route: "/remove/contacts",
	},
	shareContact: {
		description: "Use for share single contact on user contacts list",
		route: "/share/contact",
	},
	shareContacts: {
		description: "Use for share single contact on user contacts list",
		route: "/share/contacts",
	},

	error: {
		description: "Use for get all contact errors",
		route: "/error",
	},
	template: {
		description: "Use for get all contact properties and value structure",
		route: "/template",
	},
};

module.exports = { cellphoneRouteTemplate };
