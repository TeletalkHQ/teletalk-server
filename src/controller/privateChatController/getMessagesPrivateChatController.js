//TODO CLEANME
const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");

const getMessagesPrivateChatController = async (req, res) => {
	try {
		console.log("getMessagesPrivateChatController");
		const { chatID } = req.body;
		console.log(req.body);
		console.log(chatID);

		const chat = await PrivateChatModel.findOne({ chatID });

		console.log(chat);

		res.status(200).json({ chat });
	} catch (error) {
		console.log("getMessagesPrivateChatController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { getMessagesPrivateChatController };
