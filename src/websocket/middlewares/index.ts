import { Socket } from "socket.io";

import { applyMiddlewares } from "@/websocket/middlewares/applyMiddlewares";
import { attachClientId } from "@/websocket/middlewares/attachClientId";
import { attachUserId } from "@/websocket/middlewares/attachUserId";
import { checkClient } from "@/websocket/middlewares/checkClient";
import { checkCurrentClient } from "@/websocket/middlewares/checkCurrentClient";
import { checkCurrentUser } from "@/websocket/middlewares/checkCurrentUser";
import { checkDataFields } from "@/websocket/middlewares/checkDataFields";
import { checkEventAvailability } from "@/websocket/middlewares/checkEventAvailability";
import { dynamicValidator } from "@/websocket/middlewares/dynamicValidator";
import { ignoreMiddlewares } from "@/websocket/middlewares/ignoreMiddlewares";
import { selfStuffCheck } from "@/websocket/middlewares/selfStuffCheck";
import { validateClientId } from "@/websocket/middlewares/validateClientId";
import { verifyClientId } from "@/websocket/middlewares/verifyClientId";
import { verifyVerificationCode } from "@/websocket/middlewares/verifyVerificationCode";

export const registerMiddlewares = (socket: Socket) => {
  socket.customUse(validateClientId);
  socket.customUse(attachClientId);
  socket.customUse(verifyClientId);

  socket.customUse(checkEventAvailability);

  socket.customUse(
    //CLEANME: Use ignored routes for auth
    ignoreMiddlewares(["signIn", "getStuff"], checkClient)
  );

  socket.customUse(checkDataFields);
  socket.customUse(dynamicValidator);

  socket.customUse(
    //CLEANME: Use ignored routes for auth
    ignoreMiddlewares(
      ["createNewUser", "getStuff", "signIn", "verify"],
      attachUserId,
      checkCurrentUser,
      checkCurrentClient
    )
  );

  socket.customUse(applyMiddlewares("verify", verifyVerificationCode));

  socket.customUse(
    applyMiddlewares(
      [
        "addBlock",
        "addContact",
        "addContactWithCellphone",
        "editContact",
        "removeBlock",
        "removeContact",
      ],
      selfStuffCheck
    )
  );
};

export const middlewares = {
  applyMiddlewares,
  attachClientId,
  attachUserId,
  checkClient,
  checkCurrentClient,
  checkCurrentUser,
  checkDataFields,
  checkEventAvailability,
  dynamicValidator,
  ignoreMiddlewares,
  selfStuffCheck,
  validateClientId,
  verifyClientId,
  verifyVerificationCode,
};
