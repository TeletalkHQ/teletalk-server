/* //* 
//* 
//* Require test files as your wish
//* All test files using customRequest for make a request to server (in special case uses request)
//* 
 */ //*

//* Requirements ==>
require("$/requirements.spec");

//* Database ==>
require("$/database/userDb.spec");

//* User api's ==>
require("$/api/userApis/signVerifyCreate.spec");

//* Cellphone api's ==>
require("$/api/cellphoneApis/addContactApi.spec");
require("$/api/cellphoneApis/editContactApi.spec");
require("$/api/cellphoneApis/removeContactApi.spec");

require("$/api/cellphoneApis/addBlockApi.spec");
require("$/api/cellphoneApis/removeBlockApi.spec");

require("$/api/privateChatApis/sendMessageApi.spec");
require("$/api/privateChatApis/getAllChatsApi.spec");
require("$/api/privateChatApis/getAllMessages.spec");
