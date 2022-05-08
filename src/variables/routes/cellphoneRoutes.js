const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
  extractFromInfo,
} = require("@/functions/utilities/utilsNoDeps");

const cellphoneRouteBaseUrl = routeGenerator(true, "/cellphone", true, "1.0.0");

const addBlockRoute = routeGenerator(
  "post",
  "/addBlock",
  200,
  "1.0.0",
  "Use for block single contact on user contacts list"
);

const addBlocksRoute = routeGenerator(
  "post",
  "/addBlocks",
  200,
  "1.0.0",
  "Use for block single contact on user contacts list"
);

const addContactRoute = routeGenerator(
  "post",
  "/addContact",
  200,
  "1.0.0",
  "Use for add single contact to current user contacts list"
);

const addContactsRoute = routeGenerator(
  "post",
  "/addContacts",
  200,
  "1.0.0",
  "Use for add single contact to current user contacts list"
);

// const editBlockRoute = routeGenerator(
//   "patch",
//   "/editBlock",
//   200,
//   "1.0.0",
//   "User for edit single contact on user contacts list"
// );

const editContactRoute = routeGenerator(
  "patch",
  "/editContact",
  200,
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const getContactsRoute = routeGenerator(
  "get",
  "/getContacts",
  200,
  "1.0.0",
  "User for edit single contact on user contacts list"
);

const removeBlockRoute = routeGenerator(
  "delete",
  "/removeBlock",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeBlocksRoute = routeGenerator(
  "delete",
  "/removeBlocks",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeContactRoute = routeGenerator(
  "delete",
  "/removeContact",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const removeContactsRoute = routeGenerator(
  "delete",
  "/removeContacts",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list"
);

const shareContactRoute = routeGenerator(
  "post",
  "/shareContact",
  200,
  "1.0.0",
  "Use for share single contact on user contacts list"
);

const shareContactsRoute = routeGenerator(
  "post",
  "/shareContacts",
  200,
  "1.0.0",
  "Use for share single contact on user contacts list"
);

const routes = {
  addBlockRoute,
  addBlocksRoute,
  addContactRoute,
  addContactsRoute,
  cellphoneRouteBaseUrl,
  // editBlockRoute,
  editContactRoute,
  getContactsRoute,
  removeBlockRoute,
  removeBlocksRoute,
  removeContactRoute,
  removeContactsRoute,
  shareContactRoute,
  shareContactsRoute,
};

const cellphoneRoutes = {
  info: {
    version: versionCalculator(extractVersions(extractFromInfo(routes))),
  },

  properties: routes,
};

module.exports = {
  cellphoneRoutes,
};
