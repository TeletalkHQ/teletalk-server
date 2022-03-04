const getAllChatsUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user },
    } = req;

    res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log("getAllChatsUserController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { getAllChatsUserController };
