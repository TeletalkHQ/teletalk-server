import { services } from "@/services";

const getCurrentUserData = async (socket) => {
  const { currentUserId } = socket;

  const { sessions, ...userData } = await services.getCurrentUserData({
    userId: currentUserId,
  });

  return {
    user: userData,
  };
};

export { getCurrentUserData };
