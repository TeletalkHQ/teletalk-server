import chai from 'chai';
import { extractor } from 'utility-store';
import { ContactItem, UserData } from 'utility-store/lib/types';

import { services } from '~/services';
import { UserId } from '~/types/datatypes';

import { assertionInitializerHelper } from '@/classes/AssertionInitializerHelper';
import { e2eFailTestInitializerHelper } from '@/classes/E2eFailTestInitializerHelper';
import { randomMaker } from '@/classes/RandomMaker';
import { utils } from '@/utils';
import { FIELD_TYPE } from '@/variables';

describe('add contact success tests', () => {
	it('should add users to contacts', async () => {
		const { user: currentUser, socket } = await randomMaker.user();
		const requester = utils.requesterCollection.addContact(socket);

		const contactsLength = 1;
		const users: UserData[] = [];
		for (let i = 0; i < contactsLength; i++) {
			const { user: targetUser } = await randomMaker.user();
			users.push(targetUser);
		}

		const addingContacts = [];
		for (const targetUser of users) {
			const targetUserContactData = extractor.contact(targetUser);
			const sendingData: ContactItem = {
				...targetUserContactData,
				...randomMaker.fullName(),
			};

			const responsePromise = requester.sendFullFeaturedRequest(sendingData);

			addingContacts.push({
				res: responsePromise,
				sendingData,
				targetUser,
			});
		}

		for (const { sendingData, res, targetUser } of addingContacts) {
			const {
				data: { addedContact },
			} = await res;

			await testAddContactResponse({
				addedContact,
				currentUser,
				sendingData: { ...sendingData, userId: targetUser.userId },
				targetUser,
			});
		}

		const { contacts } = (await services.findOneUser({
			userId: currentUser.userId,
		}))!;

		chai.expect(contacts).to.be.an(FIELD_TYPE.ARRAY);
		chai.expect(contacts.length).to.be.equal(contactsLength);
	});
});

await utils.asyncDescribe('addContact fail tests', async () => {
	const currentUserSignData = randomMaker.unusedCellphone();
	const { requester, user: currentUser } = await utils.setupRequester(
		utils.requesterCollection.addContact,
		currentUserSignData
	);
	const selfStuffData = {
		...extractor.contact(currentUser),
		...randomMaker.fullName(),
	};

	const targetUserSignData = randomMaker.unusedCellphone();
	const { user: targetUser } = await randomMaker.user(targetUserSignData);
	const existingContactData = {
		...extractor.contact(targetUser),
		...randomMaker.fullName(),
	};

	await requester.sendFullFeaturedRequest(existingContactData);

	return () => {
		const sendingContactData: ContactItem = {
			...randomMaker.cellphone(),
			...randomMaker.fullName(),
			userId: randomMaker.userId(),
		};

		e2eFailTestInitializerHelper(requester)
			.input(sendingContactData)
			.firstName(sendingContactData)
			.lastName(sendingContactData)
			.countryCode(sendingContactData)
			.countryName(sendingContactData)
			.phoneNumber(sendingContactData)
			.selfStuff(selfStuffData)
			.contactItemExist(existingContactData)
			.userId(sendingContactData)
			.targetUserNotExist(sendingContactData);
	};
});

const testAddContactResponse = async (data: {
	addedContact: ContactItem;
	currentUser: UserData;
	sendingData: ContactItem;
	targetUser: UserData;
}) => {
	await testTargetUserContacts(data.targetUser.userId);

	const savedContact = await findSavedContact(
		data.currentUser.userId,
		data.addedContact
	);
	testOneContact(data.addedContact, savedContact);
	testOneContact(data.addedContact, data.sendingData);
};

const testTargetUserContacts = async (targetUserId: UserId) => {
	const targetUserContacts = await findContacts(targetUserId);
	chai.expect(targetUserContacts).to.be.an(FIELD_TYPE.ARRAY);
	chai.expect(targetUserContacts.length).to.be.equal(0);
};

const findSavedContact = async (
	currentUserId: UserId,
	addedContact: ContactItem
) => {
	const contacts = (await findContacts(currentUserId))!;

	return contacts.find((i) => i.userId === addedContact.userId) as ContactItem;
};

const findContacts = async (userId: UserId) => {
	const { contacts } = (await services.findOneUser({ userId })) as UserData;
	return contacts;
};

const testOneContact = (testValue: ContactItem, equalValue: ContactItem) => {
	assertionInitializerHelper()
		.userId({
			equalValue: equalValue.userId,
			testValue: testValue.userId,
		})
		.countryCode({
			equalValue: equalValue.countryCode,
			testValue: testValue.countryCode,
		})
		.countryName({
			equalValue: equalValue.countryName,
			testValue: testValue.countryName,
		})
		.phoneNumber({
			equalValue: equalValue.phoneNumber,
			testValue: testValue.phoneNumber,
		})
		.lastName({
			equalValue: equalValue.lastName,
			testValue: testValue.lastName,
		})
		.firstName({
			equalValue: equalValue.firstName,
			testValue: testValue.firstName,
		});
};
