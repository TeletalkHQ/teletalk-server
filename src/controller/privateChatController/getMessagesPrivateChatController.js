//TODO CLEANME
const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");

const getMessagesPrivateChatController = async (req, res) => {
	try {
		const { chatID } = req.body;

		const chat = await PrivateChatModel.findOne({ chatID });

		res.status(200).json({ chat });
	} catch (error) {
		console.log("getMessagesPrivateChatController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { getMessagesPrivateChatController };
