const sendMessagePrivateChatController = (req, res) => {
	try {
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { sendMessagePrivateChatController };
