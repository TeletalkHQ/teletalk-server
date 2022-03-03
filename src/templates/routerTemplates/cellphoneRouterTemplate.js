const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(true, "/cellphone", "1.0.0");

const addBlock = routeTemplateGenerator(
  "post",
  "/add/block",
  "1.0.0",
  "Use for block single contact on user contacts list"
);

const addBlocks = routeTemplateGenerator(
  "post",
  "/add/blocks",
  "1.0.0",
  "Use for block single contact on user contacts list"
);

const addContact = routeTemplateGenerator(
  "post",
  "/add/contact",
  "1.0.0",
  "Use for add single contact to current user contacts list"
);

const addContacts = routeTemplateGenerator(
  "post",
  "/add/contacts",
  "1.0.0",
  "Use for add single contact to current user contacts list"
);

const editBlock = routeTemplateGenerator(
  "patch",
  "/edit/block",
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const editContact = routeTemplateGenerator(
  "patch",
  "/edit/contact",
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const getContacts = routeTemplateGenerator(
  "get",
  "/get/contacts",
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const removeBlock = routeTemplateGenerator(
  "delete",
  "/remove/block",
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeBlocks = routeTemplateGenerator(
  "delete",
  "/remove/blocks",
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeContact = routeTemplateGenerator(
  "delete",
  "/remove/contact",
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeContacts = routeTemplateGenerator(
  "delete",
  "/remove/contacts",
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const shareContact = routeTemplateGenerator(
  "post",
  "/share/contact",
  "1.0.0",
  "Use for share single contact on user contacts list"
);

const shareContacts = routeTemplateGenerator(
  "post",
  "/share/contacts",
  "1.0.0",
  "Use for share single contact on user contacts list"
);

const error = routeTemplateGenerator(
  "get",
  "/error",
  "1.0.0",
  "Use for get all contact errors"
);

const template = routeTemplateGenerator(
  "get",
  "/template",
  "1.0.0",
  "Use for get all contact properties and value structure"
);

const cellphoneRouterTemplate = {
  addBlock,
  addBlocks,
  addContact,
  addContacts,
  baseUrl,
  editBlock,
  editContact,
  error,
  getContacts,
  removeBlock,
  removeBlocks,
  removeContact,
  removeContacts,
  shareContact,
  shareContacts,
  template,
  version: "1.0.0",
};

module.exports = {
  cellphoneRouterTemplate,
};
