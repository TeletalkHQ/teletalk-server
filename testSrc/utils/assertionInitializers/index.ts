import { bioAssertionInitializer } from './bio';
import { blacklistAssertionInitializer } from './blacklist';
import { cellphoneAssertionInitializer } from './cellphone';
import { chatIdAssertionInitializer } from './chatId';
import { clientIdAssertionInitializer } from './clientId';
import { contactsAssertionInitializer } from './contacts';
import { countryCodeAssertionInitializer } from './countryCode';
import { countryNameAssertionInitializer } from './countryName';
import { firstNameAssertionInitializer } from './firstName';
import { fullNameAssertionInitializer } from './fullName';
import { lastNameAssertionInitializer } from './lastName';
import { messageIdAssertionInitializer } from './messageId';
import { messageTextAssertionInitializer } from './messageText';
import { oneContactAssertionInitializer } from './oneContact';
import { phoneNumberAssertionInitializer } from './phoneNumber';
import { privateChatsAssertionInitializer } from './privateChats';
import { userDataAssertionInitializer } from './userData';
import { userIdAssertionInitializer } from './userId';
import { usernameAssertionInitializer } from './username';
import { verificationCodeAssertionInitializer } from './verificationCode';

export const assertionInitializers = {
	bio: bioAssertionInitializer,
	blacklist: blacklistAssertionInitializer,
	cellphone: cellphoneAssertionInitializer,
	chatId: chatIdAssertionInitializer,
	clientId: clientIdAssertionInitializer,
	contacts: contactsAssertionInitializer,
	countryCode: countryCodeAssertionInitializer,
	countryName: countryNameAssertionInitializer,
	firstName: firstNameAssertionInitializer,
	fullName: fullNameAssertionInitializer,
	lastName: lastNameAssertionInitializer,
	messageId: messageIdAssertionInitializer,
	messageText: messageTextAssertionInitializer,
	oneContact: oneContactAssertionInitializer,
	phoneNumber: phoneNumberAssertionInitializer,
	privateChats: privateChatsAssertionInitializer,
	userData: userDataAssertionInitializer,
	userId: userIdAssertionInitializer,
	username: usernameAssertionInitializer,
	verificationCode: verificationCodeAssertionInitializer,
};
