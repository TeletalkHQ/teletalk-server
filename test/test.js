/*
 * All test files are independent to each other, so orders not matter
 * Require test files as your wish
 */

//? Database ==>
require("$/tests/database/crudUser.spec");
//? userRouter api's ==>
require("$/tests/integration/routers/user/signIn.spec");
require("$/tests/integration/routers/user/verify.spec");
require("$/tests/integration/routers/user/createNewUser.spec");
require("$/tests/integration/routers/user/logout.spec");
require("$/tests/integration/routers/user/getCurrentUserData.spec");
require("$/tests/integration/routers/user/getTargetUserData.spec");
//? cellphoneRouter api's ==>
require("$/tests/integration/routers/cellphone/addContact.spec");
require("$/tests/integration/routers/cellphone/editContact.spec");
require("$/tests/integration/routers/cellphone/removeContact.spec");
require("$/tests/integration/routers/cellphone/addBlock.spec");
require("$/tests/integration/routers/cellphone/removeBlock.spec");
//? privateChatRouter api's ==>
require("$/tests/integration/routers/privateChat/sendPrivateMessage.spec");
require("$/tests/integration/routers/privateChat/getAllPrivateChats.spec");
//? middlewares ==>
require("$/tests/middleware/notFound.spec");
require("$/tests/middleware/requestMethodChecker.spec");
require("$/tests/middleware/authDefault.spec");
require("$/tests/middleware/checkBodyFields.spec");
// require("$/tests/middleware/checkCurrentUserStatus.spec");
