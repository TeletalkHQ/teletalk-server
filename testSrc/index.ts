import "@/configs/customGlobals";
import "@/helpers/requireDotenv";

import { PrivateChat } from "@/models/database/mongoDb/PrivateChat";
import { User } from "@/models/database/mongoDb/User";

import { runner } from "@/servers";

const registerTestSuits = async () => {
  await import("$/__tests__/e2e/events/auth/createNewUser.spec");
  // await import("$/__tests__/e2e/events/auth/logout.spec");
  await import("$/__tests__/e2e/events/auth/signIn.spec");
  await import("$/__tests__/e2e/events/auth/verify.spec");

  await import("$/__tests__/e2e/events/privateChat/getPrivateChat.spec");
  await import("$/__tests__/e2e/events/privateChat/getPrivateChats.spec");
  await import("$/__tests__/e2e/events/privateChat/sendPrivateMessage.spec");

  await import("$/__tests__/e2e/events/user/addBlock.spec");
  await import("$/__tests__/e2e/events/user/addContact.spec");
  await import("$/__tests__/e2e/events/user/editContact.spec");
  await import("$/__tests__/e2e/events/user/getContacts.spec");
  await import("$/__tests__/e2e/events/user/getCurrentUserData.spec");
  await import("$/__tests__/e2e/events/user/getPublicUserData.spec");
  await import("$/__tests__/e2e/events/user/removeBlock.spec");
  await import("$/__tests__/e2e/events/user/removeContact.spec");
  await import("$/__tests__/e2e/events/user/updatePublicUserData.spec");

  // //TODO: Add getCountries
  // //TODO: Add getWelcomeMessage
  await import("$/__tests__/e2e/events/other/getStaff.spec");

  await import("$/__tests__/e2e/middleware/notFound.spec");
  // // await import("$/__tests__/e2e/middleware/requestMethodChecker.spec");
  // // await import("$/__tests__/e2e/middleware/authDefault.spec");
  await import("$/__tests__/e2e/middleware/checkDataFields.spec");
  // // await import("$/__tests__/e2e/middleware/checkCurrentUserStatus.spec");
};

const resetDatabase = async () => {
  await deleteAllUsers();
  await deleteAllPrivateChats();
};

const deleteAllUsers = async () => {
  await User.deleteMany();
};

const deleteAllPrivateChats = async () => {
  await PrivateChat.deleteMany();
};

const requirements = {
  registerTestSuits,
  resetDatabase,
  runner,
};
export { requirements };
