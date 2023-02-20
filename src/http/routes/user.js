const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const { baseUrls } = require("@/http/routes/baseUrls");
const { fields } = require("@/variables/others/fields");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = httpRouteBuilder(baseUrls.user);

const addContacts = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/addContacts")
  .build();

const editContact = userRouteBuilder
  .create()
  .method(METHODS.PATCH)
  .url("/editContact")
  .inputFields(fields.collection.contactWithoutUserId)
  .outputFields([
    {
      editedContact: fields.statics.object(
        fields.collection.contactWithoutUserId
      ),
    },
  ])
  .build();

const getContacts = userRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getContacts")
  .outputFields([
    {
      contacts: fields.statics.array(fields.collection.contact),
    },
  ])
  .build();

const removeBlock = userRouteBuilder
  .create()
  .method(METHODS.DELETE)
  .url("/removeBlock")
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      removedBlock: fields.statics.object(fields.collection.cellphone),
    },
  ])
  .build();

const removeBlocks = userRouteBuilder
  .create()
  .method(METHODS.DELETE)
  .url("/removeBlocks")
  .build();

const removeContact = userRouteBuilder
  .create()
  .method(METHODS.DELETE)
  .url("/removeContact")
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      removedContact: fields.statics.object(fields.collection.cellphone),
    },
  ])
  .build();

const removeContacts = userRouteBuilder
  .create()
  .method(METHODS.DELETE)
  .url("/removeContacts")
  .build();

const shareContact = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/shareContact")
  .build();

const shareContacts = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/shareContacts")
  .build();

const getCurrentUserData = userRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getCurrentUserData")
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();

const getPublicUserData = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/getPublicUserData")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields([
    {
      publicUserData: fields.statics.object({
        ...fields.collection.fullName,
        bio: fields.single.bio,
        userId: fields.single.userId,
        username: fields.single.username,
      }),
    },
  ])
  .build();

const updatePublicUserData = userRouteBuilder
  .create()
  .method(METHODS.PATCH)
  .url("/updatePublicUserData")
  .inputFields({
    ...fields.collection.fullName,
    bio: fields.single.bio,
    username: fields.single.username,
  })
  .outputFields([
    {
      publicUserData: fields.statics.object({
        ...fields.collection.fullName,
        bio: fields.single.bio,
        status: fields.collection.status,
        userId: fields.single.userId,
        username: fields.single.username,
      }),
    },
  ])
  .build();

const userRoutes = {
  addContacts,
  editContact,
  getContacts,
  getCurrentUserData,
  getPublicUserData,
  removeBlock,
  removeBlocks,
  removeContact,
  removeContacts,
  shareContact,
  shareContacts,
  updatePublicUserData,
};

module.exports = {
  userRoutes,
};
