import "module-alias/register";

import "@/configs/customGlobals";
import "@/helpers/requireDotenv";

import { PrivateChat } from "@/models/database/mongoDb/PrivateChat";
import { User } from "@/models/database/mongoDb/User";

import { runner } from "@/servers";

//#region //? Routers =>
// ? authRouter =>
import "$/__tests__/e2e/events/auth/createNewUser.spec";
// import "$/__tests__/e2e/routes/auth/logout.spec";
import "$/__tests__/e2e/events/auth/signIn.spec";
import "$/__tests__/e2e/events/auth/verify.spec";
// ? privateChatRouter =>
import "$/__tests__/e2e/events/privateChat/getPrivateChat.spec";
import "$/__tests__/e2e/events/privateChat/getPrivateChats.spec";
import "$/__tests__/e2e/events/privateChat/sendPrivateMessage.spec";
// ? userRouter =>
import "$/__tests__/e2e/events/user/addBlock.spec";
import "$/__tests__/e2e/events/user/addContact.spec";
import "$/__tests__/e2e/events/user/editContact.spec";
import "$/__tests__/e2e/events/user/getContacts.spec";
import "$/__tests__/e2e/events/user/getCurrentUserData.spec";
import "$/__tests__/e2e/events/user/getPublicUserData.spec";
import "$/__tests__/e2e/events/user/removeBlock.spec";
import "$/__tests__/e2e/events/user/removeContact.spec";
import "$/__tests__/e2e/events/user/updatePublicUserData.spec";
// ? otherRouter =>
//TODO: Add getCountries
//TODO: Add getWelcomeMessage
import "$/__tests__/e2e/events/other/getStaff.spec";
// #endregion

// #region //? middlewares =>
import "$/__tests__/e2e/middleware/notFound.spec";
// import "$/__tests__/e2e/middleware/requestMethodChecker.spec";
// import "$/__tests__/e2e/middleware/authDefault.spec";
import "$/__tests__/e2e/middleware/checkDataFields.spec";
// import "$/__tests__/e2e/middleware/checkCurrentUserStatus.spec";
// #endregion

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

const data = {
  requirements: {
    runner,
    testServer,
  },
};
export { data as requirements };
