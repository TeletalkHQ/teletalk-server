const { chatError } = require("~/constant/error/chatError/chatError");
const { userFinder } = require("~/function/helper/userFinder");
const { randomID } = require("~/function/utility/randomID");

const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");

const { chatSchemaTemplate } = require("~/template/schemaTemplate/chatSchemaTemplate");

const startChatPrivateChatController = async (req, res) => {
	try {
		const {
			privateID: targetUserID,
			DB: { user: client },
		} = req.body;

		const { user: targetUser } = await userFinder({ privateID: targetUserID });

		const chat = await PrivateChatModel.findOne({
			"participants.participantID": { $all: [client.privateID, targetUser.privateID] },
		});

		if (chat) {
			const { CHAT_EXIST } = chatError;

			throw CHAT_EXIST;
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
		res.errorCollector(error);
		logger.log("startChatPrivateChatController catch").log(error);

		res.errorResponser();
	}
};

module.exports = { startChatPrivateChatController };
