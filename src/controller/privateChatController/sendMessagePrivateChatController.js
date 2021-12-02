const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");

const sendMessagePrivateChatController = (req, res) => {
	try {
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { sendMessagePrivateChatController };

const user = {
	chats: {
		privateChats: [{ chatID: "" }],
		// ...
	},
};
