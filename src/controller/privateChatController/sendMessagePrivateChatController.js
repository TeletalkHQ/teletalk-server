const { randomID } = require("~/function/utility/randomID");

const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");

const { chatSchemaTemplate } = require("~/template/schemaTemplate/chatSchemaTemplate");

const { chatError } = require("~/constant/error/chatError/chatError");

const sendMessagePrivateChatController = async (req, res) => {
	try {
		const {
			DB: { user },
			chatID,
			participantID,
			messageText,
		} = req.body;

		const chatFromUser = user.chats.find((chat) => chat.chatID === chatID);

		if (!chatFromUser) {
			const error = chatError.CHAT_NOT_EXIST;
			throw error;
		}

		const chat = await PrivateChatModel.findOne({ chatID });

		if (!chat) {
			const error = chatError.CHAT_NOT_EXIST;
			throw error;
		}

		const checkParticipant = chat.participants.find(
			(participant) => participant.participantID === participantID,
		);

		if (!checkParticipant) {
			const error = chatError.PARTICIPANT_NOT_EXIST;
			throw error;
		}

		const checkUserParticipation = chat.participants.find(
			(participant) => participant.participantID === user.privateID,
		);

		if (!checkUserParticipation) {
			const error = chatError.USER_NO_LONGER_PARTICIPANT;
			throw error;
		}

		chat.messages.push({
			messageText,
			messageID: randomID(chatSchemaTemplate.messageID.maxlength.value),
			messageSender: { senderID: participantID },
		});

		await chat.updateOne({ messages: chat.messages });

		res.status(200).send({ chat });
	} catch (error) {
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { sendMessagePrivateChatController };
