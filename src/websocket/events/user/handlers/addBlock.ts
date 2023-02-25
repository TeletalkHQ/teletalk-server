import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

const addBlock = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const blockingCellphone = userUtilities.extractCellphone(data);

  await services.addBlock().run({ blockingCellphone, currentUserId });

  return { blockedCellphone: blockingCellphone };
};

export { addBlock };
