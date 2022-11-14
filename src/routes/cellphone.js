const { ioFieldMaker } = require("@/classes/IoFieldMaker");
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
      countryCode: ioFieldMaker.create().type(ioFieldTypes.countryCode).build(),
      countryName: ioFieldMaker.create().type(ioFieldTypes.countryName).build(),
      phoneNumber: ioFieldMaker.create().type(ioFieldTypes.phoneNumber).build(),
    },
  ])
  .outputFields([
    {
      blockedCellphone: ioFieldMaker
        .create()
        .type(ioFieldTypes.blockedCellphone)
        .value({
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
        })
        .build(),
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
      countryCode: ioFieldMaker.create().type(ioFieldTypes.countryCode).build(),
      countryName: ioFieldMaker.create().type(ioFieldTypes.countryName).build(),
      firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
      lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
      phoneNumber: ioFieldMaker.create().type(ioFieldTypes.phoneNumber).build(),
    },
  ])
  .outputFields([
    {
      addedContact: ioFieldMaker
        .create()
        .type(ioFieldTypes.addedContact)
        .value({
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
          lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
          userId: ioFieldMaker.create().type(ioFieldTypes.userId).build(),
        })
        .build(),
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
      countryCode: ioFieldMaker.create().type(ioFieldTypes.countryCode).build(),
      countryName: ioFieldMaker.create().type(ioFieldTypes.countryName).build(),
      firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
      lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
      phoneNumber: ioFieldMaker.create().type(ioFieldTypes.phoneNumber).build(),
    },
  ])
  .outputFields([
    {
      editedContact: ioFieldMaker
        .create()
        .type(ioFieldTypes.editedContact)
        .value({
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          firstName: ioFieldMaker.create().type(ioFieldTypes.firstName).build(),
          lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
        })
        .build(),
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
      contacts: ioFieldMaker
        .create()
        .type(ioFieldTypes.contacts)
        .value([
          {
            countryCode: ioFieldMaker
              .create()
              .type(ioFieldTypes.countryCode)
              .build(),
            countryName: ioFieldMaker
              .create()
              .type(ioFieldTypes.countryName)
              .build(),
            firstName: ioFieldMaker
              .create()
              .type(ioFieldTypes.firstName)
              .build(),
            lastName: ioFieldMaker.create().type(ioFieldTypes.lastName).build(),
            phoneNumber: ioFieldMaker
              .create()
              .type(ioFieldTypes.phoneNumber)
              .build(),
            userId: ioFieldMaker.create().type(ioFieldTypes.userId).build(),
          },
        ])
        .build(),
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
      countryCode: ioFieldMaker.create().type(ioFieldTypes.countryCode).build(),
      countryName: ioFieldMaker.create().type(ioFieldTypes.countryName).build(),
      phoneNumber: ioFieldMaker.create().type(ioFieldTypes.phoneNumber).build(),
    },
  ])
  .outputFields([
    {
      removedBlockedCellphone: ioFieldMaker
        .create()
        .type(ioFieldTypes.removedBlockedCellphone)
        .value({
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
        })
        .build(),
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
      countryCode: ioFieldMaker.create().type(ioFieldTypes.countryCode).build(),
      countryName: ioFieldMaker.create().type(ioFieldTypes.countryName).build(),
      phoneNumber: ioFieldMaker.create().type(ioFieldTypes.phoneNumber).build(),
    },
  ])
  .outputFields([
    {
      removedContact: ioFieldMaker
        .create()
        .type(ioFieldTypes.removedContact)
        .value({
          countryCode: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryCode)
            .build(),
          countryName: ioFieldMaker
            .create()
            .type(ioFieldTypes.countryName)
            .build(),
          phoneNumber: ioFieldMaker
            .create()
            .type(ioFieldTypes.phoneNumber)
            .build(),
        })
        .build(),
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
