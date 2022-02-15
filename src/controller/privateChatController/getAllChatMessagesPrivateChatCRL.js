const getAllChatMessagesPrivateChatCRL = async (req, res) => {
	try {
	} catch (error) {
		console.log("getAllChatMessagesPrivateChatCRL", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { getAllChatMessagesPrivateChatCRL };
