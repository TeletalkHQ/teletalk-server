import { services } from "@/services";

import { SocketOnHandler } from "@/types";

const getContacts: SocketOnHandler = async (socket) => {
  const { currentUserId } = socket;

  const contacts = await services.getUserContacts({ currentUserId });

  return {
    contacts,
  };
};

export { getContacts };
