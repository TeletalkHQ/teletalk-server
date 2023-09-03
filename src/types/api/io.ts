import {
	Bio,
	BlackListItem,
	Cellphone,
	ContactItem,
	Contacts,
	Countries,
	FullName,
	FullNameWithUserId,
	NewUser,
	UserData,
	UserId,
	Username,
	VerificationCode,
} from "utility-store/lib/types";

import { events } from "~/websocket/events";

import { ErrorCollection, IO, ValidationCollection } from "..";
import {
	ChatId,
	ContactItemWithCellphone,
	MessageItem,
	MessageText,
	ParticipantId,
	PrivateChatItem,
	PrivateChats,
	UserPublicData,
	WelcomeMessage,
} from "../datatypes";
import { NativeModelCollection } from "../model";

export interface CreateNewUserIO extends IO {
	input: FullName;
	output: object;
}

export interface LogoutIO extends IO {
	input: object;
	output: object;
}

export interface SignInIO extends IO {
	input: Cellphone;
	output: object;
}

export interface VerifyIO extends IO {
	input: {
		verificationCode: VerificationCode;
	};
	output: {
		newUser: NewUser;
	};
}

export interface GetCountriesIO extends IO {
	input: object;
	output: {
		countries: Countries;
	};
}

export interface GetStuffIO extends IO {
	input: object;
	output: {
		errors: ErrorCollection;
		models: NativeModelCollection;
		events: typeof events;
		validationModels: ValidationCollection;
	};
}

export interface GetWelcomeMessageIO extends IO {
	input: object;
	output: {
		welcomeMessage: WelcomeMessage;
	};
}
export interface PingIO extends IO {
	input: object;
	output: {
		pong: string;
	};
}

export interface PongIO extends IO {
	input: object;
	output: { pong: string };
}

export interface GetChatInfoIO extends IO {
	input: {
		chatId: ChatId;
	};
	output: {
		chatInfo: Omit<PrivateChatItem, "messages">;
	};
}

export interface GetPrivateChatIO extends IO {
	input: {
		chatId: ChatId;
	};
	output: {
		privateChat: PrivateChatItem;
	};
}

export interface GetPrivateChatsIO extends IO {
	input: object;
	output: {
		privateChats: PrivateChats;
	};
}

export interface JoinRoomIO extends IO {
	input: object;
	output: object;
}

export interface SendMessageIO extends IO {
	input: {
		messageText: MessageText;
		targetParticipantId: ParticipantId;
	};
	output: {
		chatId: ChatId;
		addedMessage: MessageItem;
	};
}

export interface AddBlockIO extends IO {
	input: {
		userId: UserId;
	};
	output: {
		blockedUser: BlackListItem;
	};
}

export interface AddContactIO extends IO {
	input: ContactItem;
	output: {
		newContact: ContactItem;
	};
}

export interface AddContactWithCellphoneIO extends IO {
	input: ContactItemWithCellphone;
	output: {
		newContact: ContactItem;
	};
}

export interface AddContactWithUserIdIO extends IO {
	input: FullNameWithUserId;
	output: {
		newContact: ContactItem;
	};
}

export interface UpdateContactIO extends IO {
	input: FullNameWithUserId;
	output: {
		editedContact: FullNameWithUserId;
	};
}

export interface GetContactsIO extends IO {
	input: object;
	output: {
		contacts: Contacts;
	};
}

export interface GetUserDataIO extends IO {
	input: object;
	output: {
		user: UserData;
	};
}

export interface GetPublicDataIO extends IO {
	input: {
		userId: UserId;
	};
	output: {
		publicData: UserPublicData;
	};
}

export interface RemoveBlockIO extends IO {
	input: {
		userId: UserId;
	};
	output: {
		removedBlock: {
			userId: UserId;
		};
	};
}

export interface RemoveContactIO extends IO {
	input: {
		userId: UserId;
	};
	output: {
		removedContact: {
			userId: UserId;
		};
	};
}

export interface UpdatePublicDataIO extends IO {
	input: FullName & {
		bio: Bio;
		username: Username;
	};
	output: {
		userPublicData: UserPublicData;
	};
}

export type IOCollection = {
	addBlock: AddBlockIO;
	addContact: AddContactIO;
	addContactWithCellphone: AddContactWithCellphoneIO;
	addContactWithUserId: AddContactWithUserIdIO;
	createNewUser: CreateNewUserIO;
	updateContact: UpdateContactIO;
	getChatInfo: GetChatInfoIO;
	getContacts: GetContactsIO;
	getCountries: GetCountriesIO;
	getPrivateChat: GetPrivateChatIO;
	getPrivateChats: GetPrivateChatsIO;
	getStuff: GetStuffIO;
	getUserData: GetUserDataIO;
	getPublicData: GetPublicDataIO;
	getWelcomeMessage: GetWelcomeMessageIO;
	joinRoom: JoinRoomIO;
	logout: LogoutIO;
	ping: PingIO;
	pong: PongIO;
	removeBlock: RemoveBlockIO;
	removeContact: RemoveContactIO;
	sendMessage: SendMessageIO;
	signIn: SignInIO;
	updatePublicData: UpdatePublicDataIO;
	verify: VerifyIO;
};
