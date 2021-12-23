const { chatError } = require("~/constant/error/chatError/chatError");
const { userError } = require("~/constant/error/userError/userError");
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

		if (!targetUser) {
			const error = userError.USER_NOT_EXIST;
			throw error;
		}

		//TODO Use $and for test 
		const chat = await PrivateChatModel.findOne({
			"participants.participantID": { $all: [client.privateID, targetUser.privateID] },
		});

		if (chat) {
			const error = chatError.CHAT_EXIST;
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
