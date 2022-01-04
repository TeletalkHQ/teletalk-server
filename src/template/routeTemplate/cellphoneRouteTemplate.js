const baseRoute = {
	route: "/cellphone",
	version: "1.0.0",
};

const addBlock = {
	description: "Use for block single contact on user contacts list",
	route: "/add/block",
	version: "1.0.0",
};

const addBlocks = {
	description: "Use for block single contact on user contacts list",
	route: "/add/blocks",
	version: "1.0.0",
};

const addContact = {
	description: "Use for add single contact to current user contacts list",
	route: "/add/contact",
	version: "1.0.0",
};

const addContacts = {
	description: "Use for add single contact to current user contacts list",
	route: "/add/contacts",
	version: "1.0.0",
};

const editBlock = {
	description: "User for edit single contact on user contacts list",
	route: "/edit/block",
	version: "1.0.0",
};

const editContact = {
	description: "User for edit single contact on user contacts list",
	route: "/edit/contact",
	version: "1.0.0",
};

const getContacts = {
	description: "User for edit single contact on user contacts list",
	route: "/get/contacts",
	version: "1.0.0",
};

const removeBlock = {
	description: "Use for remove single contact on user contacts list",
	route: "/remove/block",
	version: "1.0.0",
};

const removeBlocks = {
	description: "Use for remove single contact on user contacts list",
	route: "/remove/blocks",
	version: "1.0.0",
};

const removeContact = {
	description: "Use for remove single contact on user contacts list",
	route: "/remove/contact",
	version: "1.0.0",
};

const removeContacts = {
	description: "Use for remove single contact on user contacts list",
	route: "/remove/contacts",
	version: "1.0.0",
};

const shareContact = {
	description: "Use for share single contact on user contacts list",
	route: "/share/contact",
	version: "1.0.0",
};

const shareContacts = {
	description: "Use for share single contact on user contacts list",
	route: "/share/contacts",
	version: "1.0.0",
};

const error = {
	description: "Use for get all contact errors",
	route: "/error",
	version: "1.0.0",
};

const template = {
	description: "Use for get all contact properties and value structure",
	route: "/template",
	version: "1.0.0",
};

const cellphoneRouteTemplate = {
	version: "1.0.0",

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
