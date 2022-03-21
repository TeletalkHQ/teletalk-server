const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(true, "/cellphone", true, "1.0.0");

const addBlock = routeTemplateGenerator(
  "post",
  "/addBlock",
  200,
  "1.0.0",
  "Use for block single contact on user contacts list"
);

const addBlocks = routeTemplateGenerator(
  "post",
  "/addBlocks",
  200,
  "1.0.0",
  "Use for block single contact on user contacts list"
);

const addContact = routeTemplateGenerator(
  "post",
  "/addContact",
  200,
  "1.0.0",
  "Use for add single contact to current user contacts list"
);

const addContacts = routeTemplateGenerator(
  "post",
  "/addContacts",
  200,
  "1.0.0",
  "Use for add single contact to current user contacts list"
);

const editBlock = routeTemplateGenerator(
  "patch",
  "/editBlock",
  200,
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const editContact = routeTemplateGenerator(
  "patch",
  "/editContact",
  200,
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const getContacts = routeTemplateGenerator(
  "get",
  "/getContacts",
  200,
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const removeBlock = routeTemplateGenerator(
  "delete",
  "/removeBlock",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeBlocks = routeTemplateGenerator(
  "delete",
  "/removeBlocks",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeContact = routeTemplateGenerator(
  "delete",
  "/removeContact",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeContacts = routeTemplateGenerator(
  "delete",
  "/removeContacts",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const shareContact = routeTemplateGenerator(
  "post",
  "/shareContact",
  200,
  "1.0.0",
  "Use for share single contact on user contacts list"
);

const shareContacts = routeTemplateGenerator(
  "post",
  "/shareContacts",
  200,
  "1.0.0",
  "Use for share single contact on user contacts list"
);

const cellphoneRouterTemplate = {
  addBlock,
  addBlocks,
  addContact,
  addContacts,
  baseUrl,
  editBlock,
  editContact,
  getContacts,
  removeBlock,
  removeBlocks,
  removeContact,
  removeContacts,
  shareContact,
  shareContacts,
  version: "1.0.0",
};

module.exports = {
  cellphoneRouterTemplate,
};
