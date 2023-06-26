import { services } from "~/services";
import { GetContactsIO, SocketOnHandler } from "~/types";

const getContacts: SocketOnHandler<GetContactsIO> = async (socket) => {
  const { userId: currentUserId } = socket;

  const contacts = await services.getUserContacts({ currentUserId });

  return {
    data: { contacts },
  };
};

export { getContacts };
