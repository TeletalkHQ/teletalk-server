import "@/configs/customGlobals";
import "@/helpers/requireDotenv";

import { User } from "@/models/database/mongoDb/User";
import { PrivateChat } from "@/models/database/mongoDb/PrivateChat";

import { requirements } from "@/requirements";

/*
 * All test files are independent to each other, so orders not matter
 * Require test files as your wish
 */

//#region //? Database =>
import "$/tests/database/crudUser.spec";
//#endregion

//#region //? Routers =>
// ? authRouter api's =>
import "$/tests/integration/routers/auth/signIn.spec";
import "$/tests/integration/routers/auth/verify.spec";
import "$/tests/integration/routers/auth/createNewUser.spec";
import "$/tests/integration/routers/auth/logout.spec";
//? privateChatRouter api's =>
import "$/tests/integration/routers/privateChat/sendPrivateMessage.spec";
import "$/tests/integration/routers/privateChat/getAllPrivateChats.spec";
import "$/tests/integration/routers/privateChat/getPrivateChat.spec";
//? userRouter api's =>
import "$/tests/integration/routers/user/addBlock.spec";
import "$/tests/integration/routers/user/removeBlock.spec";
import "$/tests/integration/routers/user/addContact.spec";
import "$/tests/integration/routers/user/editContact.spec";
import "$/tests/integration/routers/user/removeContact.spec";
import "$/tests/integration/routers/user/getContacts.spec";
import "$/tests/integration/routers/user/getCurrentUserData.spec";
import "$/tests/integration/routers/user/getPublicUserData.spec";
import "$/tests/integration/routers/user/updatePublicUserData.spec";
//? stuffRouter api's =>
import "$/tests/integration/routers/staff/getAllStaff.spec";
//#endregion

//#region //? middlewares =>
import "$/tests/middleware/notFound.spec";
import "$/tests/middleware/requestMethodChecker.spec";
import "$/tests/middleware/authDefault.spec";
import "$/tests/middleware/checkBodyFields.spec";
import "$/tests/middleware/checkCurrentUserStatus.spec";
//#endregion

const testServer = async () => {
  await deleteAllUsers();
  await deleteAllPrivateChats();
};

const deleteAllUsers = async () => {
  await User.deleteMany();
};

const deleteAllPrivateChats = async () => {
  await PrivateChat.deleteMany();
};

export { requirements, testServer };
