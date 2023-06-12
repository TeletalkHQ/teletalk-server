import { databaseModels } from "~/models/database";

const deleteAllPrivateChats = async () => {
  await databaseModels.mongoDb.PrivateChat.deleteMany();
};

const privateChatServices = { deleteAllPrivateChats };

export { privateChatServices };
