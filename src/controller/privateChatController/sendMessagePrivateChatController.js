const { randomID } = require("~/function/utility/randomID");

const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");

const { chatSchemaTemplate } = require("~/template/schemaTemplate/chatSchemaTemplate");

const { userFinder } = require("~/function/helper/userFinder");
const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");

const sendMessagePrivateChatController = async (req, res) => {
	try {
		const {
			DB: { user },
			body: { participantID, message },
		} = req;

		// const chatFromUser = user.chats.find((chat) => chat.chatID === chatID);

		// if (!chatFromUser) {
		// 	const error = chatErrorTemplate.CHAT_NOT_EXIST;
		// 	throw error;
		// }

		const { user: targetUser } = await userFinder({ privateID: participantID });

		if (!targetUser) {
			const error = userErrorTemplate.USER_NOT_EXIST;
			throw error;
		}

		const chat = await PrivateChatModel.findOne({
			"participants.participantID": { $all: [user.privateID, targetUser.privateID] },
		});

		let isNewChat = false;
		let chatID = chat?.chatID;
		if (!chat) {
			// const error = chatErrorTemplate.CHAT_NOT_EXIST;
			// throw error;
			isNewChat = true;

			chatID = randomID(chatSchemaTemplate.chatID.properties.maxlength.value);

			const privateChat = new PrivateChatModel({
				chatID,
				participants: [
					{ participantID: user.privateID },
					{ participantID: targetUser.privateID },
				],
			});

			await privateChat.save();

			await user.updateOne({ chats: { chatID } });
			await targetUser.updateOne({ chats: { chatID } });
		}

		// const checkParticipant = chat.participants.find(
		// 	(participant) => participant.participantID === participantID,
		// );

		// if (!checkParticipant) {
		// 	const error = chatErrorTemplate.PARTICIPANT_NOT_EXIST;
		// 	throw error;
		// }

		// const checkUserParticipation = chat.participants.find(
		// 	(participant) => participant.participantID === user.privateID,
		// );

		// if (!checkUserParticipation) {
		// 	const error = chatErrorTemplate.USER_NO_LONGER_PARTICIPANT;
		// 	throw error;
		// }

		const newMessage = {
			message,
			messageID: randomID(chatSchemaTemplate.messageID.properties.maxlength.value),
			messageSender: { senderID: participantID },
		};

		chat.messages.push(newMessage);

		await chat.updateOne({ messages: chat.messages });

		res.status(200).send({ newMessage, isNewChat, chatID });
	} catch (error) {
		logger.log("sendMessagePrivateChatController catch", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { sendMessagePrivateChatController };
