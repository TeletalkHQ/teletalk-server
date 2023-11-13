import chai from "chai";
import {
	Bio,
	BlackList,
	Cellphone,
	ChatId,
	ContactItem,
	ContactItemWithoutUserId,
	Contacts,
	CountryCode,
	CountryName,
	DBContactItem,
	DBContacts,
	DBUserData,
	FirstName,
	FullName,
	FullNameWithUserId,
	LastName,
	MessageId,
	MessageItem,
	MessageText,
	PhoneNumber,
	PrivateChats,
	SenderId,
	SessionId,
	Sessions,
	UserData,
	UserId,
	UserPublicData,
	Username,
	VerificationCode,
} from "teletalk-type-store";
import { utils } from "utility-store";

import { models } from "~/models";
import { Field } from "~/types";

import { AssertionInitializerArgs, AssertionInitializerOptions } from "@/types";
import { FIELD_TYPE } from "@/variables";

import { assertionInitializer } from "./AssertionInitializer";

export class Assertion {
	private singleInitializer<DataType>(fieldName: Field) {
		return (
			arg: AssertionInitializerArgs<DataType>,
			options: Partial<AssertionInitializerOptions> = this.getDefaultOptions()
		) => {
			assertionInitializer()
				.setOptions(options)
				.setVariables(models.native[fieldName], arg.equalValue, arg.testValue)
				.automate()
				.run();

			return this;
		};
	}

	private multiInitializer<DataType>(
		cb: (
			arg: AssertionInitializerArgs<DataType>,
			options: Partial<AssertionInitializerOptions>
		) => void
	) {
		return (
			arg: AssertionInitializerArgs<DataType>,
			options: Partial<AssertionInitializerOptions> = this.getDefaultOptions()
		) => {
			cb(arg, options);
			return this;
		};
	}

	private getDefaultOptions(): AssertionInitializerOptions {
		return {
			stringEquality: true,
		};
	}

	bio = this.singleInitializer<Bio>("bio");
	chatId = this.singleInitializer<ChatId>("chatId");
	sessionId = this.singleInitializer<SessionId>("sessionId");
	countryCode = this.singleInitializer<CountryCode>("countryCode");
	countryName = this.singleInitializer<CountryName>("countryName");
	firstName = this.singleInitializer<FirstName>("firstName");
	lastName = this.singleInitializer<LastName>("lastName");
	messageId = this.singleInitializer<MessageId>("messageId");
	messageText = this.singleInitializer<MessageText>("messageText");
	phoneNumber = this.singleInitializer<PhoneNumber>("phoneNumber");
	senderId = this.singleInitializer<SenderId>("senderId");
	userId = this.singleInitializer<UserId>("userId");
	username = this.singleInitializer<Username>("username");
	verificationCode =
		this.singleInitializer<VerificationCode>("verificationCode");

	blacklist = this.multiInitializer<BlackList>(
		({ testValue, equalValue }, options) => {
			chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

			testValue.forEach((item) => {
				this.userId(
					{
						testValue: item.userId,
					},
					{ ...options, stringEquality: false }
				);
			});

			if (options?.stringEquality) {
				chai.expect(equalValue).to.be.an(FIELD_TYPE.ARRAY);
				chai.expect(testValue.length).to.be.equal(equalValue!.length);

				equalValue!.forEach((item) => {
					const foundBlacklist = testValue.find(
						(i) => i.userId === item.userId
					);

					chai.expect(foundBlacklist).to.be.an(FIELD_TYPE.OBJECT);

					this.userId(
						{
							equalValue: item.userId,
							testValue: foundBlacklist!.userId,
						},
						options
					);
				});
			}
		}
	);

	sessions = this.multiInitializer<Sessions>(
		({ testValue, equalValue }, options) => {
			chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

			testValue.forEach((item) => {
				this.sessionId(
					{
						testValue: item.sessionId,
					},
					{ ...options, stringEquality: false }
				);
			});

			if (options?.stringEquality) {
				chai.expect(equalValue).to.be.an(FIELD_TYPE.ARRAY);
				chai.expect(testValue.length).to.be.equal(equalValue!.length);

				equalValue!.forEach((item) => {
					const foundClient = testValue.find(
						(i) => i.sessionId === item.sessionId
					);

					chai.expect(foundClient).to.be.an(FIELD_TYPE.OBJECT);

					this.sessionId(
						{
							equalValue: item.sessionId,
							testValue: foundClient!.sessionId,
						},
						options
					);
				});
			}
		}
	);

	contacts = this.multiInitializer<Contacts>(
		({ testValue, equalValue }, options) => {
			chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

			testValue.forEach((item) => {
				this.oneContact(
					{
						testValue: item,
					},
					{ ...options, stringEquality: false }
				);
			});

			if (options?.stringEquality) {
				chai.expect(equalValue).to.be.an(FIELD_TYPE.ARRAY);
				chai.expect(testValue.length).to.be.equal(equalValue!.length);

				equalValue!.forEach((item) => {
					const foundContact = testValue.find((c) => c.userId === item.userId);

					chai.expect(foundContact).to.be.an(FIELD_TYPE.OBJECT);

					this.oneContact(
						{
							equalValue: item,
							testValue: foundContact!,
						},
						options
					);
				});
			}
		}
	);

	dbContacts = this.multiInitializer<DBContacts>(
		({ testValue, equalValue }, options) => {
			chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

			testValue.forEach((item) => {
				this.dbOneContact(
					{
						testValue: item,
					},
					{ ...options, stringEquality: false }
				);
			});

			if (options?.stringEquality) {
				chai.expect(equalValue).to.be.an(FIELD_TYPE.ARRAY);
				chai.expect(testValue.length).to.be.equal(equalValue!.length);

				equalValue!.forEach((item) => {
					const foundContact = testValue.find((c) => c.userId === item.userId);

					chai.expect(foundContact).to.be.an(FIELD_TYPE.OBJECT);

					this.dbOneContact(
						{
							equalValue: item,
							testValue: foundContact!,
						},
						options
					);
				});
			}
		}
	);

	privateChats = this.multiInitializer<PrivateChats>(({ testValue }) => {
		chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

		//TODO: add all parts

		// if (options?.stringEquality) {
		// 	chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);
		// 	chai.expect(testValue.length).to.be.equal(equalValue!.length);

		// 	equalValue!.forEach((item) => {
		// 		const foundPV = testValue.find((c) => c.chatId === item.chatId);

		// 		chai.expect(foundPV).to.be.an(FIELD_TYPE.OBJECT);

		// 		chatIdAssertionInitializer({
		// 			testValue: item.chatId,
		// 			equalValue: foundPV?.chatId,
		// 		});

		// 		 messageTextAssertionInitializer({ testValue:item.messages, equalValue });
		// 	});
		// }
	});

	contactsWithCellphone = this.multiInitializer<ContactItemWithoutUserId[]>(
		({ testValue, equalValue }, options) => {
			chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

			testValue.forEach((item) => {
				this.oneContactWithCellphone(
					{
						testValue: item,
					},
					{ ...options, stringEquality: false }
				);
			});

			if (options?.stringEquality) {
				chai.expect(equalValue).to.be.an(FIELD_TYPE.ARRAY);
				chai.expect(testValue.length).to.be.equal(equalValue!.length);

				equalValue!.forEach((item) => {
					const foundContact = testValue.find((c) =>
						utils.isDataHasEqualityWithTargetCellphone(item, c)
					);

					chai.expect(foundContact).to.be.an(FIELD_TYPE.OBJECT);

					this.oneContactWithCellphone(
						{
							equalValue: item,
							testValue: foundContact!,
						},
						options
					);
				});
			}
		}
	);

	oneContactWithCellphone = this.multiInitializer<ContactItemWithoutUserId>(
		({ testValue, equalValue }, options) => {
			this.fullName(
				{
					equalValue,
					testValue,
				},
				options
			);

			this.cellphone(
				{
					equalValue,
					testValue,
				},
				options
			);
		}
	);

	oneContactWithUserId = this.multiInitializer<FullNameWithUserId>(
		({ testValue, equalValue }, options) => {
			this.fullName(
				{
					equalValue,
					testValue,
				},
				options
			);

			this.userId(
				{
					equalValue: equalValue?.userId,
					testValue: testValue.userId,
				},
				options
			);
		}
	);

	cellphone = this.multiInitializer<Cellphone>(
		({ testValue, equalValue }, options) => {
			this.countryCode(
				{
					equalValue: equalValue?.countryCode,
					testValue: testValue.countryCode,
				},
				options
			);
			this.countryName(
				{
					equalValue: equalValue?.countryName,
					testValue: testValue.countryName,
				},
				options
			);
			this.phoneNumber(
				{
					equalValue: equalValue?.phoneNumber,
					testValue: testValue.phoneNumber,
				},
				options
			);
		}
	);

	contactsWithUserId = this.multiInitializer<FullNameWithUserId[]>(
		({ testValue, equalValue }, options) => {
			chai.expect(testValue).to.be.an(FIELD_TYPE.ARRAY);

			testValue.forEach((item) => {
				this.oneContactWithUserId(
					{
						testValue: item,
					},
					{ ...options, stringEquality: false }
				);
			});

			if (options?.stringEquality) {
				chai.expect(equalValue).to.be.an(FIELD_TYPE.ARRAY);
				chai.expect(testValue.length).to.be.equal(equalValue!.length);

				equalValue!.forEach((item) => {
					const foundContact = testValue.find((c) => c.userId === item.userId);

					chai.expect(foundContact).to.be.an(FIELD_TYPE.OBJECT);

					this.oneContactWithUserId(
						{
							equalValue: item,
							testValue: foundContact!,
						},
						options
					);
				});
			}
		}
	);

	fullName = this.multiInitializer<FullName>(
		({ testValue, equalValue }, options) => {
			this.firstName(
				{
					equalValue: equalValue?.firstName,
					testValue: testValue.firstName,
				},
				options
			);

			this.lastName(
				{
					equalValue: equalValue?.lastName,
					testValue: testValue.lastName,
				},
				options
			);
		}
	);

	oneContact = this.multiInitializer<ContactItem>(
		({ testValue, equalValue }, options) => {
			this.fullName({ equalValue, testValue }, options);

			this.cellphone(
				{
					equalValue,
					testValue,
				},
				options
			);

			this.userId(
				{
					equalValue: equalValue?.userId,
					testValue: testValue.userId,
				},
				options
			);
		}
	);

	dbOneContact = this.multiInitializer<DBContactItem>(
		({ testValue, equalValue }, options) => {
			this.fullName({ equalValue, testValue }, options);

			this.userId(
				{
					equalValue: equalValue?.userId,
					testValue: testValue.userId,
				},
				options
			);
		}
	);

	userData = this.multiInitializer<UserData>(
		({ testValue, equalValue }, options) => {
			chai.expect(equalValue).to.be.an(FIELD_TYPE.OBJECT);
			chai.expect(testValue).to.be.an(FIELD_TYPE.OBJECT);

			this.bio(
				{
					equalValue: equalValue!.bio,
					testValue: testValue.bio,
				},
				options
			);

			this.blacklist(
				{
					equalValue: equalValue!.blacklist,
					testValue: testValue.blacklist,
				},
				options
			);

			this.cellphone(
				{
					equalValue,
					testValue,
				},
				options
			);

			this.contacts(
				{
					equalValue: equalValue!.contacts,
					testValue: testValue.contacts,
				},
				options
			);

			this.fullName(
				{
					equalValue,
					testValue,
				},
				options
			);

			this.userId(
				{
					equalValue: equalValue!.userId,
					testValue: testValue.userId,
				},
				options
			);

			this.username(
				{
					equalValue: equalValue!.username,
					testValue: testValue.username,
				},
				options
			);
		}
	);

	dbUserData = this.multiInitializer<DBUserData>(
		({ testValue, equalValue }, options) => {
			chai.expect(equalValue).to.be.an(FIELD_TYPE.OBJECT);
			chai.expect(testValue).to.be.an(FIELD_TYPE.OBJECT);

			this.bio(
				{
					equalValue: equalValue!.bio,
					testValue: testValue.bio,
				},
				options
			);

			this.blacklist(
				{
					equalValue: equalValue!.blacklist,
					testValue: testValue.blacklist,
				},
				options
			);

			this.cellphone(
				{
					equalValue,
					testValue,
				},
				options
			);

			this.dbContacts(
				{
					equalValue: equalValue!.contacts,
					testValue: testValue.contacts,
				},
				options
			);

			this.fullName(
				{
					equalValue,
					testValue,
				},
				options
			);

			this.userId(
				{
					equalValue: equalValue!.userId,
					testValue: testValue.userId,
				},
				options
			);

			this.username(
				{
					equalValue: equalValue!.username,
					testValue: testValue.username,
				},
				options
			);
		}
	);

	userPublicData = this.multiInitializer<UserPublicData>(
		({ testValue, equalValue }, options) => {
			this.bio(
				{
					testValue: testValue.bio,
					equalValue: equalValue?.bio,
				},
				options
			);

			this.fullName(
				{
					equalValue,
					testValue,
				},
				options
			);

			this.userId(
				{
					testValue: testValue.userId,
					equalValue: equalValue?.userId,
				},
				options
			);

			this.username(
				{ testValue: testValue.username, equalValue: testValue.username },
				options
			);
		}
	);

	oneMessage = this.multiInitializer<MessageItem>(
		({ testValue, equalValue }, options) => {
			this.messageText(
				{
					testValue: testValue.messageText,
					equalValue: equalValue?.messageText,
				},
				options
			);

			this.messageId(
				{
					testValue: testValue.messageId,
					equalValue: equalValue?.messageId,
				},
				options
			);

			this.userId(
				{
					testValue: testValue.sender.senderId,
					equalValue: equalValue?.sender.senderId,
				},
				options
			);
		}
	);
}

export const assertion = () => new Assertion();
