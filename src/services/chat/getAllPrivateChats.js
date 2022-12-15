const { models } = require("@/models");

const PrivateChat = models.database.mongoDb.PrivateChat;

const getAllPrivateChats = async (
  { currentUserId },
  projections = {
    __v: 0,
    _id: 0,
    "messages._id": 0,
    "participants._id": 0,
  },
  options = { lean: true }
) => {
  return (
    (await PrivateChat.find(
      {
        "participants.participantId": currentUserId,
      },
      projections,
      options
    )) || []
  );
};

module.exports = { getAllPrivateChats };
