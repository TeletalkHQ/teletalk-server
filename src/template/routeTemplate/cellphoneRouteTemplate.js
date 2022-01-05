const baseRoute = {
	properties: { description: "", route: "/cellphone" },
	info: {
		version: "1.0.0",
	},
};

const addBlock = {
	properties: {
		description: "Use for block single contact on user contacts list",
		method: "post",
		route: "/add/block",
	},
	info: {
		version: "1.0.0",
	},
};

const addBlocks = {
	properties: {
		description: "Use for block single contact on user contacts list",
		method: "post",
		route: "/add/blocks",
	},
	info: {
		version: "1.0.0",
	},
};

const addContact = {
	properties: {
		description: "Use for add single contact to current user contacts list",
		method: "post",
		route: "/add/contact",
	},
	info: {
		version: "1.0.0",
	},
};

const addContacts = {
	properties: {
		description: "Use for add single contact to current user contacts list",
		method: "post",
		route: "/add/contacts",
	},
	info: {
		version: "1.0.0",
	},
};

const editBlock = {
	properties: {
		description: "User for edit single contact on user contacts list",
		method: "post",
		route: "/edit/block",
	},
	info: {
		version: "1.0.0",
	},
};

const editContact = {
	properties: {
		description: "User for edit single contact on user contacts list",
		method: "post",
		route: "/edit/contact",
	},
	info: {
		version: "1.0.0",
	},
};

const getContacts = {
	properties: {
		description: "User for edit single contact on user contacts list",
		method: "get",
		route: "/get/contacts",
	},
	info: {
		version: "1.0.0",
	},
};

const removeBlock = {
	properties: {
		description: "Use for remove single contact on user contacts list",
		method: "post",
		route: "/remove/block",
	},
	info: {
		version: "1.0.0",
	},
};

const removeBlocks = {
	properties: {
		description: "Use for remove single contact on user contacts list",
		method: "post",
		route: "/remove/blocks",
	},
	info: {
		version: "1.0.0",
	},
};

const removeContact = {
	properties: {
		description: "Use for remove single contact on user contacts list",
		method: "post",
		route: "/remove/contact",
	},
	info: {
		version: "1.0.0",
	},
};

const removeContacts = {
	properties: {
		description: "Use for remove single contact on user contacts list",
		method: "post",
		route: "/remove/contacts",
	},
	info: {
		version: "1.0.0",
	},
};

const shareContact = {
	properties: {
		description: "Use for share single contact on user contacts list",
		method: "post",
		route: "/share/contact",
	},
	info: {
		version: "1.0.0",
	},
};

const shareContacts = {
	properties: {
		description: "Use for share single contact on user contacts list",
		method: "post",
		route: "/share/contacts",
	},
	info: {
		version: "1.0.0",
	},
};

const error = {
	properties: {
		description: "Use for get all contact errors",
		method: "get",
		route: "/error",
	},
	info: {
		version: "1.0.0",
	},
};

const template = {
	properties: {
		description: "Use for get all contact properties and value structure",
		method: "get",
		route: "/template",
	},
	info: {
		version: "1.0.0",
	},
};

const cellphoneRouteTemplate = {
	info: {
		version: "1.0.0",
	},

	baseRoute,
	addBlock,
	addBlocks,
	addContact,
	addContacts,
	editBlock,
	editContact,
	getContacts,
	removeBlock,
	removeBlocks,
	removeContact,
	removeContacts,
	shareContact,
	shareContacts,
	error,
	template,
};

module.exports = {
	cellphoneRouteTemplate,

	baseRoute,
	addBlock,
	addBlocks,
	addContact,
	addContacts,
	editBlock,
	editContact,
	getContacts,
	removeBlock,
	removeBlocks,
	removeContact,
	removeContacts,
	shareContact,
	shareContacts,
	error,
	template,
};
