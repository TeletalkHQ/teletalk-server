/*
 * All test files are independent to each other, so orders not matter
 * Require test files as your wish
 */

//#region //? Database =>
require("$/tests/database/crudUser.spec");
//#endregion

//#region //? Routers =>
// ? authRouter api's =>
require("$/tests/integration/routers/auth/signIn.spec");
require("$/tests/integration/routers/auth/verify.spec");
require("$/tests/integration/routers/auth/createNewUser.spec");
require("$/tests/integration/routers/auth/logout.spec");
// //? privateChatRouter api's =>
// require("$/tests/integration/routers/privateChat/sendPrivateMessage.spec");
// require("$/tests/integration/routers/privateChat/getAllPrivateChats.spec");
// require("$/tests/integration/routers/privateChat/getPrivateChat.spec");
// //? userRouter api's =>
// require("$/tests/integration/routers/user/addBlock.spec");
// require("$/tests/integration/routers/user/removeBlock.spec");
// require("$/tests/integration/routers/user/addContact.spec");
// require("$/tests/integration/routers/user/editContact.spec");
// require("$/tests/integration/routers/user/removeContact.spec");
// require("$/tests/integration/routers/user/getContacts.spec");
// require("$/tests/integration/routers/user/getCurrentUserData.spec");
// require("$/tests/integration/routers/user/getPublicUserData.spec");
// require("$/tests/integration/routers/user/updatePublicUserData.spec");
// //? stuffRouter api's =>
// require("$/tests/integration/routers/staff/getAllStaff.spec");
// //#endregion

// //#region //? middlewares =>
// require("$/tests/middleware/notFound.spec");
// require("$/tests/middleware/requestMethodChecker.spec");
// require("$/tests/middleware/authDefault.spec");
// require("$/tests/middleware/checkBodyFields.spec");
// // require("$/tests/middleware/checkCurrentUserStatus.spec");
// //#endregion
