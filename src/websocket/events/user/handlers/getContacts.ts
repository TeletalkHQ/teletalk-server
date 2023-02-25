import { services } from "@/services";

const getContacts = async (socket) => {
  const { currentUserId } = socket;

  const contacts = await services.getUserContacts().run({ currentUserId });

  return {
    contacts,
  };
};

export { getContacts };
