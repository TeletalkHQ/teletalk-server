import { services } from "@/services";

//FIXME: Convert to websocket
const tryToGetAllUsers = async () => {
  const users = await services.getAllUsers().run();
  return { users };
};

const getAllUsers = tryToGetAllUsers;

export { getAllUsers };
