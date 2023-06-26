import { GetWelcomeMessageIO, SocketOnHandler } from "~/types";

const getWelcomeMessage: SocketOnHandler<GetWelcomeMessageIO> = async () => {
  return {
    data: {
      welcomeMessage: "Hey! Welcome to teletalk <3",
    },
  };
};

export { getWelcomeMessage };
