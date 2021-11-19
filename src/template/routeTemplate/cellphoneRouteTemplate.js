const cellphoneRouteTemplate = {
	baseRoute: "/cellphone",

	addContact: {
		route: "/add/contact",
		description: "Use for add single contact to current user contacts list",
	},
	addContacts: {
		route: "/add/contacts",
		description: "Use for add single contact to current user contacts list",
	},
	addBlock: {
		route: "add/block",
		description: "Use for block single contact on user contacts list",
	},
	addBlocks: {
		route: "add/blocks",
		description: "Use for block single contact on user contacts list",
	},
	editContact: {
		route: "/edit/contact",
		description: "User for edit single contact on user contacts list",
	},
	editBlock: {
		route: "/edit/block",
		description: "User for edit single contact on user contacts list",
	},
	removeContact: {
		route: "/remove/contact",
		description: "Use for remove single contact on user contacts list",
	},
	removeContacts: {
		route: "/remove/contacts",
		description: "Use for remove single contact on user contacts list",
	},
	removeBlock: {
		route: "/remove/block",
		description: "Use for remove single contact on user contacts list",
	},
	removeBlocks: {
		route: "/remove/blocks",
		description: "Use for remove single contact on user contacts list",
	},
	shareContact: {
		route: "/share/contact",
		description: "Use for share single contact on user contacts list",
	},
	shareContacts: {
		route: "/share/contacts",
		description: "Use for share single contact on user contacts list",
	},

	error: {
		route: "/error",
		description: "Use for get all contact errors",
	},
	template: {
		route: "/template",
		description: "Use for get all contact properties and value structure",
	},
};

module.exports = { cellphoneRouteTemplate };
