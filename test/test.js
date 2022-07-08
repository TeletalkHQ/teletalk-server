/*
 * Require test files as your wish
 * All test files using customRequest for make a request to server (in special case uses request)
 */

const { eventEmitter } = require("@/classes/EventEmitter");

//? Requirements ==>
require("$/requirements.spec");

eventEmitter.addListener({
  event: eventEmitter.eventKeys.requirementsGetDone,
  listener: () => {
    //? Database ==>
    require("$/database/userDb.spec");

    //? User api's ==>
    require("$/api/userApis/signInNormalApi.spec");
    require("$/api/userApis/verifySignInNormalApi.spec");
    require("$/api/userApis/createNewUserApi.spec");

    //? Cellphone api's ==>
    require("$/api/cellphoneApis/addContactApi.spec");
    require("$/api/cellphoneApis/editContactApi.spec");
    require("$/api/cellphoneApis/removeContactApi.spec");

    require("$/api/cellphoneApis/addBlockApi.spec");
    require("$/api/cellphoneApis/removeBlockApi.spec");

    require("$/api/privateChatApis/sendMessageApi.spec");
    require("$/api/privateChatApis/getAllChatsApi.spec");
    require("$/api/privateChatApis/getPrivateChatMessagesApi.spec");
  },
});
