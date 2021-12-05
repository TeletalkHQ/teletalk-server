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
			"participants.participantID": client.privateID,
			// "participants.participantID": targetUser.privateID,
		});

		if (chat) {
			logger.log(chat);
			res.status(200).json(chat);
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
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { startChatPrivateChatController };
