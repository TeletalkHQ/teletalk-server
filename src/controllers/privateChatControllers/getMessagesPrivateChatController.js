const { PrivateChatModel } = require("~/models/chatModels/privateChatModel");

const { chatErrorTemplate } = require("~/templates/errorTemplates/chatErrorTemplate");

const getMessagesPrivateChatController = async (req, res) => {
	try {
		const {
			body: { chatID },
			DB: { user },
		} = req;

		if (!chatID) {
			const error = chatErrorTemplate.CHAT_ID_REQUIRED;
			throw error;
		}

		const chatFromUser = user.chats.find((chat) => chat.chatID === chatID);

		const { CHAT_NOT_EXIST } = chatErrorTemplate;

		if (!chatFromUser) {
			throw CHAT_NOT_EXIST;
		}

		const chat = await PrivateChatModel.findOne({ chatID });

		if (!chat) {
			throw CHAT_NOT_EXIST;
		}

		res.status(200).json({ messages: chat.messages });
	} catch (error) {
		console.log("getMessagesPrivateChatController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { getMessagesPrivateChatController };
