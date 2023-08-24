import { testServerInitializer } from "../utils";

await testServerInitializer();

const registerTests = async () => {
	await import("@/__tests__/e2e/events/auth/signIn.spec");
	await import("@/__tests__/e2e/events/auth/createNewUser.spec");
	await import("@/__tests__/e2e/events/auth/logout.spec");
	await import("@/__tests__/e2e/events/auth/verify.spec");
	await import("@/__tests__/e2e/events/other/getStuff.spec");
	await import("@/__tests__/e2e/events/privateChat/getPrivateChat.spec");
	await import("@/__tests__/e2e/events/privateChat/getPrivateChats.spec");
	await import("@/__tests__/e2e/events/privateChat/sendPrivateMessage.spec");
	await import("@/__tests__/e2e/events/user/addBlock.spec");
	await import("@/__tests__/e2e/events/user/addContact.spec");
	await import("@/__tests__/e2e/events/user/addContactWithCellphone.spec");
	await import("@/__tests__/e2e/events/user/addContactWithUserId.spec");
	await import("@/__tests__/e2e/events/user/editContact.spec");
	await import("@/__tests__/e2e/events/user/getContacts.spec");
	await import("@/__tests__/e2e/events/user/getPublicUserData.spec");
	await import("@/__tests__/e2e/events/user/getUserData.spec");
	await import("@/__tests__/e2e/events/user/removeBlock.spec");
	await import("@/__tests__/e2e/events/user/removeContact.spec");
	await import("@/__tests__/e2e/events/user/updatePublicUserData.spec");
	await import("@/__tests__/e2e/middleware/attachClientStr.spec");
	await import("@/__tests__/e2e/middleware/checkClient.spec");
	await import("@/__tests__/e2e/middleware/checkCurrentClient.spec");
	await import("@/__tests__/e2e/middleware/checkCurrentUser.spec");
	await import("@/__tests__/e2e/middleware/checkDataFields.spec");
	await import("@/__tests__/e2e/middleware/checkEventAvailability.spec");
	await import("@/__tests__/e2e/middleware/validateClientId.spec");
	await import("@/__tests__/e2e/middleware/verifyClient.spec");
};

await registerTests();
