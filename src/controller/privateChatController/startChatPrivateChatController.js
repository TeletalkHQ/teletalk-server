const { chatErrorTemplate } = require("~/template/errorTemplate/chatErrorTemplate");
const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");
const { userFinder } = require("~/function/helper/userFinder");
const { randomID } = require("~/function/utility/randomID");

const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");

const { chatSchemaTemplate } = require("~/template/schemaTemplate/chatSchemaTemplate");

const startChatPrivateChatController = async (req, res) => {
	try {
		const {
			body: { privateID: targetUserID },
			DB: { user: client },
		} = req;

		const { user: targetUser } = await userFinder({ privateID: targetUserID });

		if (!targetUser) {
			const error = userErrorTemplate.USER_NOT_EXIST;
			throw error;
		}

		//TODO Use $and for test
		const chat = await PrivateChatModel.findOne({
			"participants.participantID": { $all: [client.privateID, targetUser.privateID] },
		});

		if (chat) {
			const error = chatErrorTemplate.CHAT_EXIST;
			throw error;
		}

		const chatID = randomID(chatSchemaTemplate.chatID.maxlength.value);

		const privateChat = new PrivateChatModel({
			chatID,
			participants: [
				{ participantID: client.privateID },
				{ participantID: targetUser.privateID },
			],
		});

		await privateChat.save();

		await client.updateOne({ chats: { chatID } });
		await targetUser.updateOne({ chats: { chatID } });

		res.status(200).json({ client, targetUser });
	} catch (error) {
		res.errorCollector({ data: { error } });
		logger.log("startChatPrivateChatController catch", error).log();

		res.errorResponser();
	}
};

module.exports = { startChatPrivateChatController };
