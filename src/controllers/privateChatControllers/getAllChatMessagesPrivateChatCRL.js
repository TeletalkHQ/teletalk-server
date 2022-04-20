const getAllChatMessagesPrivateChatCRL = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
  } catch (error) {
    logger.log("getAllChatMessagesPrivateChatCRL", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getAllChatMessagesPrivateChatCRL };
