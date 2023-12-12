import { databaseModels } from "~/models/database";

const deleteAllPrivateChats = async () => {
  await databaseModels.PrivateChat.deleteMany();
};

export const privateChatServices = { deleteAllPrivateChats };
