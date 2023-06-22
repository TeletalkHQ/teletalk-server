import { services } from "~/services";
import { SocketOnHandler } from "~/types";

const getContacts: SocketOnHandler = async (socket) => {
  const { userId: currentUserId } = socket;

  const contacts = await services.getUserContacts({ currentUserId });

  return {
    data: { contacts },
  };
};

export { getContacts };
