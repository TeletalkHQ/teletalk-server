/* eslint-disable no-case-declarations */

/* eslint-disable indent */
import { faker } from '@faker-js/faker';
import { IoFields } from 'check-fields';
import { Socket } from 'socket.io-client';
import { Cellphone, FullName } from 'utility-store/lib/types';

import { models } from '~/models';
import {
	AddBlockIO,
	AddContactIO,
	AddContactWithCellphoneIO,
	AddContactWithUserIdIO,
	CreateNewUserIO,
	EditContactIO,
	EventName,
	GetChatInfoIO,
	GetContactsIO,
	GetCountriesIO,
	GetPrivateChatIO,
	GetPrivateChatsIO,
	GetPublicUserDataIO,
	GetStuffIO,
	GetUserDataIO,
	GetWelcomeMessageIO,
	IO,
	JoinRoomIO,
	LogoutIO,
	NativeError,
	PingIO,
	RemoveBlockIO,
	RemoveContactIO,
	SendPrivateMessageIO,
	SignInIO,
	SocketEvent,
	UpdatePublicUserDataIO,
	VerifyIO,
} from '~/types';
import { Field } from '~/types/models';
import { utils as mainUtils } from '~/utils';
import { countries } from '~/variables';
import { events } from '~/websocket/events';

import { randomMaker } from '@/classes/RandomMaker';
import { requesterMaker } from '@/classes/Requester';
import { RequesterMaker, RequesterMakerWrapper } from '@/types';

async function asyncDescribe(title: string, suite: () => Promise<() => void>) {
	const describeBody = await suite();

	try {
		describe(title, describeBody);
	} catch (error) {
		mainUtils.crashServer(error);
	}
}

const setupRequester = async <IOType extends IO>(
	requester: RequesterMaker<IOType>,
	cellphone?: Cellphone,
	fullName?: FullName
) => {
	const { socket, user } = await randomMaker.user(cellphone, fullName);
	return {
		requester: requester(socket),
		user,
		socket,
	};
};

const getWrongCountryCode = (): string => {
	const randomCountryCode = randomMaker.stringNumber(
		models.native.countryCode.maxLength
	);

	const isCountryExist = countries.some(
		(c) => c.countryCode === randomCountryCode
	);

	if (isCountryExist) return getWrongCountryCode();

	return randomCountryCode;
};

const createFailTestMessage = (error: NativeError, eventName: EventName) => {
	return `expected error: [event:${eventName}] [side:${error.side}] [reason:${error.reason}]`;
};

function generateDynamicData(schema: IoFields): Record<string, unknown> {
	const data: Record<string, unknown> = {};

	Object.entries(schema).forEach(([fieldName, field]) => {
		const FIELD_NAME = fieldName as Field;
		const fieldModel = models.native[FIELD_NAME];

		switch (field.type) {
			case 'string':
				if (FIELD_NAME === 'countryCode') {
					data[fieldName] = randomMaker.country().countryCode;
					break;
				}
				if (FIELD_NAME === 'countryName') {
					data[fieldName] = randomMaker.country().countryName;
					break;
				}
				if (FIELD_NAME === 'phoneNumber') {
					// @ts-ignore
					data[fieldName] = randomMaker.stringNumber(fieldModel.maxLength);
					break;
				}

				data[fieldName] = faker.string.sample(
					// @ts-ignore
					fieldModel.minLength,
					// @ts-ignore
					fieldModel.maxLength
				);
				break;
			// case "number":
			//   data[fieldName] = faker.datatype.number();
			// break;
			case 'boolean':
				data[fieldName] = faker.datatype.boolean();
				break;
			case 'object':
				data[fieldName] = generateDynamicData(field.value as IoFields);
				break;
			// case "array":
			//   const fieldArr = Array.isArray(field)
			//     ? field
			//     : [field];
			//   data[fieldName] = fieldArr.map((item) => {
			//     if (typeof item === "string") {
			//       if (fieldName === "countryCode" || fieldName === "phoneNumber") {
			//         return faker.datatype
			//           .number(fieldModel.maxLength)
			//           .toString();
			//       }
			//       return faker.datatype.string(fieldModel.maxLength);
			//     }
			//     // else if (typeof item === "number") {
			//     //   return faker.datatype.number();
			//     // }
			//     else if (typeof item === "boolean") {
			//       return faker.datatype.boolean();
			//     } else if (typeof item === "object") {
			//       return generateDynamicData(item as IoFields);
			//     }
			//     return undefined;
			//   });
			//   break;
			default:
				data[fieldName] = null;
				break;
		}
	});

	return data;
}

const requesterMakerHelper = <IOType extends IO>(
	event: SocketEvent<IOType>
) => {
	return ((socket: Socket) => {
		return requesterMaker(socket, event);
	}) as RequesterMakerWrapper<IOType>;
};

const findEvent = <IOType extends IO>(n: EventName) =>
	events.find((i) => i.name === n)! as unknown as SocketEvent<IOType>;

const requesterCollection = {
	addBlock: requesterMakerHelper(findEvent<AddBlockIO>('addBlock')),
	addContact: requesterMakerHelper(findEvent<AddContactIO>('addContact')),
	addContactWithCellphone: requesterMakerHelper(
		findEvent<AddContactWithCellphoneIO>('addContactWithCellphone')
	),
	addContactWithUserId: requesterMakerHelper(
		findEvent<AddContactWithUserIdIO>('addContactWithUserId')
	),
	createNewUser: requesterMakerHelper(
		findEvent<CreateNewUserIO>('createNewUser')
	),
	editContact: requesterMakerHelper(findEvent<EditContactIO>('editContact')),
	getChatInfo: requesterMakerHelper(findEvent<GetChatInfoIO>('getChatInfo')),
	getContacts: requesterMakerHelper(findEvent<GetContactsIO>('getContacts')),
	getCountries: requesterMakerHelper(findEvent<GetCountriesIO>('getCountries')),
	getPrivateChat: requesterMakerHelper(
		findEvent<GetPrivateChatIO>('getPrivateChat')
	),
	getPrivateChats: requesterMakerHelper(
		findEvent<GetPrivateChatsIO>('getPrivateChats')
	),
	getPublicUserData: requesterMakerHelper(
		findEvent<GetPublicUserDataIO>('getPublicUserData')
	),
	getStuff: requesterMakerHelper(findEvent<GetStuffIO>('getStuff')),
	getUserData: requesterMakerHelper(findEvent<GetUserDataIO>('getUserData')),
	getWelcomeMessage: requesterMakerHelper(
		findEvent<GetWelcomeMessageIO>('getWelcomeMessage')
	),
	joinRoom: requesterMakerHelper(findEvent<JoinRoomIO>('joinRoom')),
	logout: requesterMakerHelper(findEvent<LogoutIO>('logout')),
	ping: requesterMakerHelper(findEvent<PingIO>('ping')),
	removeBlock: requesterMakerHelper(findEvent<RemoveBlockIO>('removeBlock')),
	removeContact: requesterMakerHelper(
		findEvent<RemoveContactIO>('removeContact')
	),
	sendPrivateMessage: requesterMakerHelper(
		findEvent<SendPrivateMessageIO>('sendPrivateMessage')
	),
	signIn: requesterMakerHelper(findEvent<SignInIO>('signIn')),
	updatePublicUserData: requesterMakerHelper(
		findEvent<UpdatePublicUserDataIO>('updatePublicUserData')
	),
	verify: requesterMakerHelper(findEvent<VerifyIO>('verify')),
	pong: requesterMakerHelper(findEvent<PingIO>('pong')),
};

export const utils = {
	asyncDescribe,
	createFailTestMessage,
	generateDynamicData,
	getWrongCountryCode,
	requesterCollection,
	requesterMakerHelper,
	setupRequester,
};
