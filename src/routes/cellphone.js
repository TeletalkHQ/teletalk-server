const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const { ioFieldTypes } = require("@/variables/others/inputOutputFields");

const cellphoneRouteBuilder = routeBuilder(baseUrls.cellphone);

const addBlock = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addBlock")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for block single contact on user contacts list")
  .inputFields([
    {
      countryCode: ioFieldTypes.countryCode,
      countryName: ioFieldTypes.countryName,
      phoneNumber: ioFieldTypes.phoneNumber,
    },
  ])
  .outputFields([
    {
      blockedCellphone: {
        countryCode: ioFieldTypes.countryCode,
        countryName: ioFieldTypes.countryName,
        phoneNumber: ioFieldTypes.phoneNumber,
      },
    },
  ])
  .build();

const addBlocks = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addBlocks")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for block single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const addContact = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addContact")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for add single contact to current user contacts list")
  .inputFields([
    {
      countryCode: ioFieldTypes.countryCode,
      countryName: ioFieldTypes.countryName,
      firstName: ioFieldTypes.firstName,
      lastName: ioFieldTypes.lastName,
      phoneNumber: ioFieldTypes.phoneNumber,
    },
  ])
  .outputFields([
    {
      addedContact: {
        countryCode: ioFieldTypes.countryCode,
        countryName: ioFieldTypes.countryName,
        firstName: ioFieldTypes.firstName,
        lastName: ioFieldTypes.lastName,
        phoneNumber: ioFieldTypes.phoneNumber,
        userId: ioFieldTypes.userId,
      },
    },
  ])
  .build();

const addContacts = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addContacts")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for add single contact to current user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const editContact = cellphoneRouteBuilder
  .create()
  .method("patch")
  .url("/editContact")
  .statusCode(200)
  .version("1.0.0")
  .description("User for edit single contact on user contacts list")
  .inputFields([
    {
      countryCode: ioFieldTypes.countryCode,
      countryName: ioFieldTypes.countryName,
      firstName: ioFieldTypes.firstName,
      lastName: ioFieldTypes.lastName,
      phoneNumber: ioFieldTypes.phoneNumber,
    },
  ])
  .outputFields([
    {
      editedContact: {
        countryCode: ioFieldTypes.countryCode,
        countryName: ioFieldTypes.countryName,
        firstName: ioFieldTypes.firstName,
        lastName: ioFieldTypes.lastName,
        phoneNumber: ioFieldTypes.phoneNumber,
      },
    },
  ])
  .build();

const getContacts = cellphoneRouteBuilder
  .create()
  .method("get")
  .url("/getContacts")
  .statusCode(200)
  .version("1.0.0")
  .description("User for edit single contact on user contacts list")
  .inputFields([{}])
  .outputFields([
    {
      contacts: [
        {
          countryCode: ioFieldTypes.countryCode,
          countryName: ioFieldTypes.countryName,
          firstName: ioFieldTypes.firstName,
          lastName: ioFieldTypes.lastName,
          phoneNumber: ioFieldTypes.phoneNumber,
          userId: ioFieldTypes.userId,
        },
      ],
    },
  ])
  .build();

const removeBlock = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeBlock")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([
    {
      countryCode: ioFieldTypes.countryCode,
      countryName: ioFieldTypes.countryName,
      phoneNumber: ioFieldTypes.phoneNumber,
    },
  ])
  .outputFields([
    {
      removedBlockedCellphone: {
        countryCode: ioFieldTypes.countryCode,
        countryName: ioFieldTypes.countryName,
        phoneNumber: ioFieldTypes.phoneNumber,
      },
    },
  ])
  .build();

const removeBlocks = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeBlocks")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const removeContact = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeContact")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([
    {
      countryCode: ioFieldTypes.countryCode,
      countryName: ioFieldTypes.countryName,
      phoneNumber: ioFieldTypes.phoneNumber,
    },
  ])
  .outputFields([
    {
      removedContact: {
        countryCode: ioFieldTypes.countryCode,
        countryName: ioFieldTypes.countryName,
        phoneNumber: ioFieldTypes.phoneNumber,
      },
    },
  ])
  .build();

const removeContacts = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeContacts")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const shareContact = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/shareContact")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for share single contact on user contacts list")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const shareContacts = cellphoneRouteBuilder
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
  addBlock,
  addBlocks,
  addContact,
  addContacts,
  editContact,
  getContacts,
  removeBlock,
  removeBlocks,
  removeContact,
  removeContacts,
  shareContact,
  shareContacts,
};

const cellphone = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = {
  cellphone,
};
