const { routeGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeGenerator(true, "/cellphone", true, "1.0.0");

const addBlock = routeGenerator(
  "post",
  "/addBlock",
  200,
  "1.0.0",
  "Use for block single contact on user contacts list"
);

const addBlocks = routeGenerator(
  "post",
  "/addBlocks",
  200,
  "1.0.0",
  "Use for block single contact on user contacts list"
);

const addContact = routeGenerator(
  "post",
  "/addContact",
  200,
  "1.0.0",
  "Use for add single contact to current user contacts list"
);

const addContacts = routeGenerator(
  "post",
  "/addContacts",
  200,
  "1.0.0",
  "Use for add single contact to current user contacts list"
);

const editBlock = routeGenerator(
  "patch",
  "/editBlock",
  200,
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const editContact = routeGenerator(
  "patch",
  "/editContact",
  200,
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const getContacts = routeGenerator(
  "get",
  "/getContacts",
  200,
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const removeBlock = routeGenerator(
  "delete",
  "/removeBlock",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeBlocks = routeGenerator(
  "delete",
  "/removeBlocks",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeContact = routeGenerator(
  "delete",
  "/removeContact",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeContacts = routeGenerator(
  "delete",
  "/removeContacts",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const shareContact = routeGenerator(
  "post",
  "/shareContact",
  200,
  "1.0.0",
  "Use for share single contact on user contacts list"
);

const shareContacts = routeGenerator(
  "post",
  "/shareContacts",
  200,
  "1.0.0",
  "Use for share single contact on user contacts list"
);

const cellphoneRoutes = {
  info: { version: "1.0.0" },

  properties: {
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
  },
};

module.exports = {
  cellphoneRoutes,
};
