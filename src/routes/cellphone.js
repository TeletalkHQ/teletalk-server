const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const cellphoneRouteBuilder = routeBuilder(baseUrls.cellphone);

const addBlock = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addBlock")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for block single contact on user contacts list")
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      blockedCellphone: fields.statics.object(fields.collection.cellphone),
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
  .build();

const addContact = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addContact")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for add single contact to current user contacts list")
  .inputFields(fields.collection.contactWithoutUserId)
  .outputFields([
    {
      addedContact: fields.statics.object(fields.collection.contact),
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
  .build();

const editContact = cellphoneRouteBuilder
  .create()
  .method("patch")
  .url("/editContact")
  .statusCode(200)
  .version("1.0.0")
  .description("User for edit single contact on user contacts list")
  .inputFields(fields.collection.contactWithoutUserId)
  .outputFields([
    {
      editedContact: fields.statics.object(
        fields.collection.contactWithoutUserId
      ),
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
  .outputFields([
    {
      contacts: fields.statics.object(fields.collection.contact),
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
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      removedBlockedCellphone: fields.statics.object(
        fields.collection.cellphone
      ),
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
  .build();

const removeContact = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeContact")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for remove single contact on user contacts list")
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      removedContact: fields.statics.object(fields.collection.cellphone),
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
  .build();

const shareContact = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/shareContact")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for share single contact on user contacts list")
  .build();

const shareContacts = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/shareContacts")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for share single contact on user contacts list")
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
