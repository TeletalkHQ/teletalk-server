const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const {
  inputOutputFields: {
    addedContact,
    blockedCellphone,
    countryCode,
    countryName,
    editedContact,
    firstName,
    lastName,
    phoneNumber,
    privateId,
    removedBlockedCellphone,
    removedContact,
  },
} = require("@/variables/constants/initialValues/initialValue");

const cellphoneRouteBaseUrl = routeGenerator(true, "/cellphone", true, "1.0.0");

const addBlockRoute = routeGenerator(
  "post",
  "/addBlock",
  200,
  "1.0.0",
  "Use for block single contact on user contacts list",
  [
    {
      countryCode,
      countryName,
      phoneNumber,
    },
  ],
  [
    {
      [blockedCellphone]: {
        countryCode,
        countryName,
        phoneNumber,
      },
    },
  ]
);

const addBlocksRoute = routeGenerator(
  "post",
  "/addBlocks",
  200,
  "1.0.0",
  "Use for block single contact on user contacts list",
  [{}],
  [{}]
);

const addContactRoute = routeGenerator(
  "post",
  "/addContact",
  200,
  "1.0.0",
  "Use for add single contact to current user contacts list",
  [
    {
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
    },
  ],
  [
    {
      [addedContact]: {
        countryCode,
        countryName,
        firstName,
        lastName,
        phoneNumber,
        privateId,
      },
    },
  ]
);

const addContactsRoute = routeGenerator(
  "post",
  "/addContacts",
  200,
  "1.0.0",
  "Use for add single contact to current user contacts list",
  [{}],
  [{}]
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
  "User for edit single contact on user contacts list",
  [{ countryCode, countryName, firstName, lastName, phoneNumber }],
  [
    {
      [editedContact]: {
        countryCode,
        countryName,
        firstName,
        lastName,
        phoneNumber,
      },
    },
  ]
);

const getContactsRoute = routeGenerator(
  "get",
  "/getContacts",
  200,
  "1.0.0",
  "User for edit single contact on user contacts list",
  [{}],
  [{}]
);

const removeBlockRoute = routeGenerator(
  "delete",
  "/removeBlock",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list",
  [
    {
      countryCode,
      countryName,
      phoneNumber,
    },
  ],
  [
    {
      [removedBlockedCellphone]: {
        countryCode,
        countryName,
        phoneNumber,
      },
    },
  ]
);

const removeBlocksRoute = routeGenerator(
  "delete",
  "/removeBlocks",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list",
  [{}],
  [{}]
);

const removeContactRoute = routeGenerator(
  "delete",
  "/removeContact",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list",
  [{ countryCode, countryName, phoneNumber }],
  [
    {
      [removedContact]: { countryCode, countryName, phoneNumber },
    },
  ]
);

const removeContactsRoute = routeGenerator(
  "delete",
  "/removeContacts",
  200,
  "1.0.0",
  "Use for remove single contact on user contacts list",
  [{}],
  [{}]
);

const shareContactRoute = routeGenerator(
  "post",
  "/shareContact",
  200,
  "1.0.0",
  "Use for share single contact on user contacts list",
  [{}],
  [{}]
);

const shareContactsRoute = routeGenerator(
  "post",
  "/shareContacts",
  200,
  "1.0.0",
  "Use for share single contact on user contacts list",
  [{}],
  [{}]
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
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = {
  cellphoneRoutes,
};
