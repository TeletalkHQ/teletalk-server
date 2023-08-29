import { bioAssertionInitializer } from "./bio";
import { blacklistAssertionInitializer } from "./blacklist";
import { cellphoneAssertionInitializer } from "./cellphone";
import { chatIdAssertionInitializer } from "./chatId";
import { clientIdAssertionInitializer } from "./clientId";
import { clientsAssertionInitializer } from "./clients";
import { contactsAssertionInitializer } from "./contacts";
import { contactsWithCellphoneAssertionInitializer } from "./contactsWithCellphone";
import { contactsWithUserIdAssertionInitializer } from "./contactsWithUserId";
import { countryCodeAssertionInitializer } from "./countryCode";
import { countryNameAssertionInitializer } from "./countryName";
import { firstNameAssertionInitializer } from "./firstName";
import { fullNameAssertionInitializer } from "./fullName";
import { lastNameAssertionInitializer } from "./lastName";
import { messageIdAssertionInitializer } from "./messageId";
import { messageTextAssertionInitializer } from "./messageText";
import { oneContactAssertionInitializer } from "./oneContact";
import { oneContactWithCellphoneAssertionInitializer } from "./oneContactWithCellphone";
import { oneContactWithUserIdAssertionInitializer } from "./oneContactWithUserId";
import { phoneNumberAssertionInitializer } from "./phoneNumber";
import { privateChatsAssertionInitializer } from "./privateChats";
import { senderIdAssertionInitializer } from "./senderId";
import { userDataAssertionInitializer } from "./userData";
import { userIdAssertionInitializer } from "./userId";
import { userPublicDataAssertionInitializer } from "./userPublicData";
import { usernameAssertionInitializer } from "./username";
import { verificationCodeAssertionInitializer } from "./verificationCode";

export const assertionInitializers = {
	bio: bioAssertionInitializer,
	blacklist: blacklistAssertionInitializer,
	cellphone: cellphoneAssertionInitializer,
	chatId: chatIdAssertionInitializer,
	clientId: clientIdAssertionInitializer,
	clients: clientsAssertionInitializer,
	contacts: contactsAssertionInitializer,
	contactsWithCellphone: contactsWithCellphoneAssertionInitializer,
	contactsWithUserId: contactsWithUserIdAssertionInitializer,
	countryCode: countryCodeAssertionInitializer,
	countryName: countryNameAssertionInitializer,
	firstName: firstNameAssertionInitializer,
	fullName: fullNameAssertionInitializer,
	lastName: lastNameAssertionInitializer,
	messageId: messageIdAssertionInitializer,
	messageText: messageTextAssertionInitializer,
	oneContact: oneContactAssertionInitializer,
	oneContactWithCellphone: oneContactWithCellphoneAssertionInitializer,
	oneContactWithUserId: oneContactWithUserIdAssertionInitializer,
	phoneNumber: phoneNumberAssertionInitializer,
	privateChats: privateChatsAssertionInitializer,
	senderId: senderIdAssertionInitializer,
	userData: userDataAssertionInitializer,
	userId: userIdAssertionInitializer,
	username: usernameAssertionInitializer,
	userPublicData: userPublicDataAssertionInitializer,
	verificationCode: verificationCodeAssertionInitializer,
};
