const getAllChatMessagesPrivateChatCRL = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
  } catch (error) {
    logger.log("getAllChatMessagesPrivateChatCRL catch, error: ", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getAllChatMessagesPrivateChatCRL };
