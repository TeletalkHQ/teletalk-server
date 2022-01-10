const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");

const chatsLastMessageChatController = async (req, res) => {
	try {
		const {
			DB: { user },
		} = req;

		const chats = [];
		for (const chat of user.chats) {
			const chatWithMessages = await PrivateChatModel.findOne({ chatID: chat.chatID });
			if (chatWithMessages) {
				chats.push(chatWithMessages);
			}
		}

		console.log(chats.messages);

		res.status(200).json({ chats });
	} catch (error) {
		console.log("chatsLastMessageChatController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { chatsLastMessageChatController };
