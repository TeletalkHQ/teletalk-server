const { userFinder } = require("~/function/helper/userFinder");
const { randomID } = require("~/function/utility/randomID");

const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");

const { chatSchemaTemplate } = require("~/template/schemaTemplate/chatSchemaTemplate");

const startChatPrivateChatController = (req, res) => {
	try {
		const {
			privateID: targetUserID,
			DB: { user: client },
		} = req.body;
		const { user: targetUser } = userFinder({ privateID: targetUserID });

		const chatID = randomID(chatSchemaTemplate.chatID.maxlength.value);

		const privateChat = new PrivateChatModel({
			chatID,
			participants: [
				{ participantID: client.privateID },
				{ participantID: targetUser.privateID },
			],
		});

		privateChat.save();

		client.updateOne({ chats: { chatID } });
		targetUser.updateOne({ chats: { chatID } });
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { startChatPrivateChatController };
