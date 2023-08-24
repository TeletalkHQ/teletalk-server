import chai from "chai";
import { Socket } from "socket.io-client";
import { UserData } from "utility-store/lib/types";

import { models } from "~/models";
import { services } from "~/services";
import { PrivateChatItem } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";
import { FIELD_TYPE } from "@/variables";

describe("getPrivateChat success tests", () => {
	it("Should get private chat related to client by chatId", async () => {
		const { user: currentUser, socket } = await randomMaker.user();
		const { user: targetUser } = await randomMaker.user();

		const messageText = "Hello! Im messages!";
		for (let i = 0; i < 10; i++) {
			const {
				data: { chatId },
			} = await utils.requesterCollection
				.sendPrivateMessage(socket)
				.sendFullFeaturedRequest({
					messageText,
					participantId: targetUser.userId,
				});

			await testPrivateChat(chatId, socket, currentUser, targetUser);
		}
	});
});

await utils.asyncDescribe("getPrivateChat fail tests", async () => {
	const { requester } = await utils.setupRequester(
		utils.requesterCollection.getPrivateChat
	);

	return () => {
		const data = {
			chatId: randomMaker.string(models.native.chatId.maxLength),
		};

		e2eFailTestInitializerHelper(requester).chatId(data);
	};
});

const testPrivateChat = async (
	chatId: string,
	socket: Socket,
	currentUser: UserData,
	targetUser: UserData
) => {
	const { privateChat } = await getPrivateChat(socket, chatId);
	chai.expect(privateChat).to.be.an(FIELD_TYPE.OBJECT);
	chai.expect(privateChat.participants).to.be.an(FIELD_TYPE.ARRAY);
	chai.expect(privateChat.participants.length).to.be.equal(2);

	const privateChatFromDb = await findStoredPrivateChat(
		currentUser.userId,
		targetUser.userId
	);

	chai.expect(privateChatFromDb).to.be.an(FIELD_TYPE.OBJECT);
	chai.expect(privateChatFromDb.participants).to.be.an(FIELD_TYPE.ARRAY);
	chai.expect(privateChatFromDb.participants.length).to.be.equal(2);

	testChatId(chatId, privateChat, privateChatFromDb);
	testMessages(privateChat, privateChatFromDb);
	testParticipants(
		currentUser.userId,
		privateChat,
		privateChatFromDb,
		targetUser.userId
	);
};

const getPrivateChat = async (socket: Socket, chatId: string) => {
	const { data } = await utils.requesterCollection
		.getPrivateChat(socket)
		.sendFullFeaturedRequest({ chatId });
	return data;
};

const findStoredPrivateChat = async (
	currentUserId: string,
	targetUserId: string
) => {
	return (await services.findOnePrivateChat({
		"participants.participantId": {
			$all: [currentUserId, targetUserId],
		},
	}))!;
};

const testChatId = (
	chatId: string,
	privateChat: PrivateChatItem,
	privateChatFromDb: PrivateChatItem
) => {
	assertionInitializerHelper().chatId({
		equalValue: chatId,
		testValue: privateChatFromDb.chatId,
	});
	assertionInitializerHelper().chatId({
		equalValue: chatId,
		testValue: privateChat.chatId,
	});
};

const testMessages = (
	foundChat: PrivateChatItem,
	privateChatFromDb: PrivateChatItem
) => {
	for (const item of foundChat.messages) {
		const {
			messageId,
			messageText: text,
			sender: { senderId },
		} = item;
		const foundMessageFromDb = privateChatFromDb.messages.find(
			(i) => i.messageId === messageId
		)!;

		assertionInitializerHelper()
			.messageText({
				equalValue: foundMessageFromDb.messageText,
				testValue: text,
			})
			.messageId({
				equalValue: foundMessageFromDb.messageId,
				testValue: messageId,
			})
			.userId({
				equalValue: foundMessageFromDb.sender.senderId,
				testValue: senderId,
			});
	}
};

const testParticipants = (
	currentUserId: string,
	foundChat: PrivateChatItem,
	privateChatFromDb: PrivateChatItem,
	targetUserId: string
) => {
	const {
		currentParticipantFromEvent,
		currentParticipantFromDb,
		targetParticipantFromEvent,
		targetParticipantFromDb,
	} = findAllParticipants(
		currentUserId,
		foundChat,
		privateChatFromDb,
		targetUserId
	);

	assertionInitializerHelper()
		.userId({
			equalValue: currentUserId,
			testValue: currentParticipantFromDb.participantId,
		})
		.userId({
			equalValue: targetUserId,
			testValue: targetParticipantFromDb.participantId,
		})
		.userId({
			equalValue: currentUserId,
			testValue: currentParticipantFromEvent.participantId,
		})
		.userId({
			equalValue: targetUserId,
			testValue: targetParticipantFromEvent.participantId,
		});
};

const findAllParticipants = (
	currentUserId: string,
	foundChat: PrivateChatItem,
	privateChatFromDb: PrivateChatItem,
	targetUserId: string
) => {
	return {
		currentParticipantFromEvent: findParticipant(foundChat, currentUserId),
		currentParticipantFromDb: findParticipant(privateChatFromDb, currentUserId),
		targetParticipantFromEvent: findParticipant(foundChat, targetUserId),
		targetParticipantFromDb: findParticipant(privateChatFromDb, targetUserId),
	};
};
const findParticipant = (privateChat: PrivateChatItem, participantId: string) =>
	privateChat.participants.find((i) => i.participantId === participantId)!;
