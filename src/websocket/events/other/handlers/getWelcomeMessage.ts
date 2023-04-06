import { SocketOnHandler } from "@/types";

const getWelcomeMessage: SocketOnHandler = async () => {
  return {
    data: {
      message: "Hey! Welcome to teletalk <3",
    },
  };
};

export { getWelcomeMessage };
