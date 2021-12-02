const { userFinder } = require("~/function/helper/userFinder");
const { randomID } = require("~/function/utility/randomID");
const { chatSchemaTemplate } = require("~/template/schemaTemplate/chatSchemaTemplate");

const startChatPrivateChatController = (req, res) => {
	try {
		const {
			privateID: targetUserID,
			DB: { user: client },
		} = req.body;

		const privateChatID = randomID(chatSchemaTemplate.chatID.maxlength.value);

		client.updateOne({ chats: { chatID: privateChatID } });

		const { user: targetUser } = userFinder({ privateID: targetUserID });
		targetUser.updateOne({ chats: { chatID: privateChatID } });
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { startChatPrivateChatController };
