import { databaseModels } from "~/models/database";

const deleteAllUsers = async () => {
	await databaseModels.User.deleteMany();
};

export const userServices = {
	deleteAllUsers,
};
