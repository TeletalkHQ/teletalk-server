import {
	BlackList,
	Cellphone,
	ContactItem,
	Contacts,
	CountryCode,
	CountryName,
	FullName,
	UserData,
} from "utility-store/lib/types";

import {
	Bio,
	ChatId,
	ClientId,
	FirstName,
	LastName,
	MessageId,
	MessageText,
	PhoneNumber,
	PrivateChats,
	UserId,
	Username,
	VerificationCode,
} from "~/types/datatypes";

import { AssertionInitializerArgs, AssertionInitializerOptions } from "@/types";
import { assertionInitializers } from "@/utils/assertionInitializers";

type MethodName = keyof typeof assertionInitializers;

export class AssertionInitializerHelper {
	private initializer<DataType>(methodName: MethodName) {
		return (
			arg: AssertionInitializerArgs<DataType>,
			options?: AssertionInitializerOptions
		) => {
			assertionInitializers[methodName](arg as any, options);
			return this;
		};
	}

	bio = this.initializer<Bio>("bio");
	blacklist = this.initializer<BlackList>("blacklist");
	cellphone = this.initializer<Cellphone>("cellphone");
	chatId = this.initializer<ChatId>("chatId");
	clientId = this.initializer<ClientId>("clientId");
	contacts = this.initializer<Contacts>("contacts");
	countryCode = this.initializer<CountryCode>("countryCode");
	countryName = this.initializer<CountryName>("countryName");
	firstName = this.initializer<FirstName>("firstName");
	fullName = this.initializer<FullName>("fullName");
	lastName = this.initializer<LastName>("lastName");
	messageId = this.initializer<MessageId>("messageId");
	messageText = this.initializer<MessageText>("messageText");
	oneContact = this.initializer<ContactItem>("oneContact");
	phoneNumber = this.initializer<PhoneNumber>("phoneNumber");
	privateChats = this.initializer<PrivateChats>("privateChats");
	userData = this.initializer<UserData>("userData");
	userId = this.initializer<UserId>("userId");
	username = this.initializer<Username>("username");
	verificationCode = this.initializer<VerificationCode>("verificationCode");
}

export const assertionInitializerHelper = () =>
	new AssertionInitializerHelper();
