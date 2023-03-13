import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { Cellphone, SocketOnHandler } from "@/types";

const addBlock: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const blockingCellphone = userUtilities.extractCellphone(data as Cellphone);

  await services.addBlock({ blockingCellphone, currentUserId });

  return { blockedCellphone: blockingCellphone };
};

export { addBlock };
