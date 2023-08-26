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

import { ErrorCollection, ValidationCollection } from "..";
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
import { NativeModelCollection } from "../models";

export interface CreateNewUserIO {
	input: FullName;
	output: object;
}

export interface LogoutIO {
	input: object;
	output: object;
}

export interface SignInIO {
	input: Cellphone;
	output: object;
}

export interface VerifyIO {
	input: {
		verificationCode: VerificationCode;
	};
	output: {
		newUser: NewUser;
	};
}

export interface GetCountriesIO {
	input: object;
	output: {
		countries: Countries;
	};
}

export interface GetStuffIO {
	input: object;
	output: {
		errors: ErrorCollection;
		models: NativeModelCollection;
		events: typeof events;
		validationModels: ValidationCollection;
	};
}

export interface GetWelcomeMessageIO {
	input: object;
	output: {
		welcomeMessage: WelcomeMessage;
	};
}
export interface PingIO {
	input: object;
	output: {
		pong: string;
	};
}

export interface GetChatInfoIO {
	input: {
		chatId: ChatId;
	};
	output: {
		chatInfo: Omit<PrivateChatItem, "messages">;
	};
}

export interface GetPrivateChatIO {
	input: {
		chatId: ChatId;
	};
	output: {
		privateChat: PrivateChatItem;
	};
}

export interface GetPrivateChatsIO {
	input: object;
	output: {
		privateChats: PrivateChats;
	};
}

export interface JoinRoomIO {
	input: object;
	output: object;
}

export interface SendPrivateMessageIO {
	input: {
		messageText: MessageText;
		participantId: ParticipantId;
	};
	output: {
		chatId: ChatId;
		addedMessage: MessageItem;
	};
}

export interface AddBlockIO {
	input: {
		userId: UserId;
	};
	output: {
		blockedUser: BlackListItem;
	};
}

export interface AddContactIO {
	input: ContactItem;
	output: {
		addedContact: ContactItem;
	};
}

export interface AddContactWithCellphoneIO {
	input: ContactItemWithCellphone;
	output: {
		addedContact: ContactItem;
	};
}

export interface AddContactWithUserIdIO {
	input: FullNameWithUserId;
	output: {
		addedContact: ContactItem;
	};
}

export interface EditContactIO {
	input: FullNameWithUserId;
	output: {
		editedContact: FullNameWithUserId;
	};
}

export interface GetContactsIO {
	input: object;
	output: {
		contacts: Contacts;
	};
}

export interface GetUserDataIO {
	input: object;
	output: {
		user: UserData;
	};
}

export interface GetUserPublicDataIO {
	input: {
		userId: UserId;
	};
	output: {
		userPublicData: UserPublicData;
	};
}

export interface RemoveBlockIO {
	input: {
		userId: UserId;
	};
	output: {
		removedBlock: {
			userId: UserId;
		};
	};
}

export interface RemoveContactIO {
	input: {
		userId: UserId;
	};
	output: {
		removedContact: {
			userId: UserId;
		};
	};
}

export interface UpdateUserPublicDataIO {
	input: FullName & {
		bio: Bio;
		username: Username;
	};
	output: {
		userPublicData: UserPublicData;
	};
}
