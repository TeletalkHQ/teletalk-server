const { randomID } = require("~/functions/utilities/randomID");

const { PrivateChatModel } = require("~/models/chatModels/privateChatModel");

const { chatSchemaTemplate } = require("~/templates/schemaTemplates/chatSchemaTemplate");

const { userFinder } = require("~/functions/helpers/userFinder");
const { userErrorTemplate } = require("~/templates/errorTemplates/userErrorTemplate");

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

		let chatID = chat?.chatID;

		const newMessage = {
			message,
			messageID: randomID(chatSchemaTemplate.messageID.properties.maxlength.value),
			messageSender: { senderID: user.privateID },
		};

		if (!chat) {
			// const error = chatErrorTemplate.CHAT_NOT_EXIST;
			// throw error;

			chatID = randomID(chatSchemaTemplate.chatID.properties.maxlength.value);

			const privateChat = new PrivateChatModel({
				chatID,
				participants: [
					{ participantID: user.privateID },
					{ participantID: targetUser.privateID },
				],
				messages: [newMessage],
			});

			await privateChat.save();

			await user.updateOne({ chats: { chatID } });
			await targetUser.updateOne({ chats: { chatID } });
			res.status(200).send({ newMessage, chatID });
		} else if (chat) {
			chat.messages.push(newMessage);

			await chat.updateOne({ messages: chat.messages });

			res.status(200).send({ newMessage, chatID });
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
	} catch (error) {
		logger.log("sendMessagePrivateChatController catch", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { sendMessagePrivateChatController };
