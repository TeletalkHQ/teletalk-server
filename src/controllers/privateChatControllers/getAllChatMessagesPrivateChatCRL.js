const getAllChatMessagesPrivateChatCRL = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
  } catch (error) {
    console.log("getAllChatMessagesPrivateChatCRL", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { getAllChatMessagesPrivateChatCRL };
