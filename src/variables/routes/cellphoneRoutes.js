const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const {
  inputOutputFields: {
    addedContact,
    blockedCellphone,
    contacts,
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
} = require("@/variables/others/inputOutputFields");

const cellphoneRouteBuilder = routeBuilder("/cellphone");

const cellphoneRouteBaseUrl = cellphoneRouteBuilder
  .create()
  .createBaseUrlObject("1.0.0");

const addBlockRoute = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addBlock")
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

const addBlocksRoute = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addBlocks")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for block single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const addContactRoute = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addContact")
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

const addContactsRoute = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addContacts")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for add single contact to current user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const editContactRoute = cellphoneRouteBuilder
  .create()
  .method("patch")
  .url("/editContact")
  .statusCode(200)
  .version("1.0.0")
  .description("User for edit single contact on user contacts list")
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

const getContactsRoute = cellphoneRouteBuilder
  .create()
  .method("get")
  .url("/getContacts")
  .statusCode(200)
  .version("1.0.0")
  .description("User for edit single contact on user contacts list")
  .inputFields([{}])
  .outputFields([
    {
      [contacts]: [
        {
          countryCode,
          countryName,
          firstName,
          lastName,
          phoneNumber,
          privateId,
        },
      ],
    },
  ])
  .build();

const removeBlockRoute = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeBlock")
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

const removeBlocksRoute = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeBlocks")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const removeContactRoute = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeContact")
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
      [removedContact]: {
        countryCode,
        countryName,
        phoneNumber,
      },
    },
  ])
  .build();

const removeContactsRoute = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeContacts")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const shareContactRoute = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/shareContact")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for share single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const shareContactsRoute = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/shareContacts")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for share single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const routes = {
  //FIXME: rename x's to multi
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
