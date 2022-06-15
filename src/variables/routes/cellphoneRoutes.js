const { routeBuilder } = require("@/classes/Builders");
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
} = require("@/variables/others/initialOptions");

const cellphoneRouteBaseUrl = routeBuilder
  .create()
  .url("/cellphone")
  .baseUrl()
  .version("1.0.0")
  .build();

const addBlockRoute = routeBuilder
  .create()
  .method("post")
  .url("/addBlock")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for block single contact on user contacts list")
  .inputFields([
    {
      countryCode,
      countryName,
      phoneNumber,
    },
  ])
  .outputFields([
    {
      [blockedCellphone]: {
        countryCode,
        countryName,
        phoneNumber,
      },
    },
  ])
  .build();

const addBlocksRoute = routeBuilder
  .create()
  .method("post")
  .url("/addBlocks")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for block single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const addContactRoute = routeBuilder
  .create()
  .method("post")
  .url("/addContact")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for add single contact to current user contacts list")
  .inputFields([
    {
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
    },
  ])
  .outputFields([
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
  ])
  .build();

const addContactsRoute = routeBuilder
  .create()
  .method("post")
  .url("/addContacts")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for add single contact to current user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const editContactRoute = routeBuilder
  .create()
  .method("patch")
  .url("/editContact")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("User for edit single contact on user contacts list")
  .inputFields([{ countryCode, countryName, firstName, lastName, phoneNumber }])
  .outputFields([
    {
      [editedContact]: {
        countryCode,
        countryName,
        firstName,
        lastName,
        phoneNumber,
      },
    },
  ])
  .build();

const getContactsRoute = routeBuilder
  .create()
  .method("get")
  .url("/getContacts")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("User for edit single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const removeBlockRoute = routeBuilder
  .create()
  .method("delete")
  .url("/removeBlock")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([
    {
      countryCode,
      countryName,
      phoneNumber,
    },
  ])
  .outputFields([
    {
      [removedBlockedCellphone]: {
        countryCode,
        countryName,
        phoneNumber,
      },
    },
  ])
  .build();

const removeBlocksRoute = routeBuilder
  .create()
  .method("delete")
  .url("/removeBlocks")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const removeContactRoute = routeBuilder
  .create()
  .method("delete")
  .url("/removeContact")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([{ countryCode, countryName, phoneNumber }])
  .outputFields([
    {
      [removedContact]: { countryCode, countryName, phoneNumber },
    },
  ])
  .build();

const removeContactsRoute = routeBuilder
  .create()
  .method("delete")
  .url("/removeContacts")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const shareContactRoute = routeBuilder
  .create()
  .method("post")
  .url("/shareContact")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for share single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const shareContactsRoute = routeBuilder
  .create()
  .method("post")
  .url("/shareContacts")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description("Use for share single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const routes = {
  addBlockRoute,
  addBlocksRoute,
  addContactRoute,
  addContactsRoute,
  cellphoneRouteBaseUrl,
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
