//* Requirements ==>
require("$/requirements.spec");

// * Database ==>
// require("$/database/userDb.spec");

// * User api's ==>
require("$/api/userApis/signInNormalApi.spec");
require("$/api/userApis/verifySignInNormalApi.spec");
require("$/api/userApis/createNewUserApi.spec");

//* Cellphone api's ==>
require("$/api/cellphoneApis/addContactApi.spec");
require("$/api/cellphoneApis/removeContactApi.spec");
require("$/api/cellphoneApis/addBlockApi.spec");
require("$/api/cellphoneApis/removeBlockApi.spec");
