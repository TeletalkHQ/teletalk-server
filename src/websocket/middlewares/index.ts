import { attachCurrentUserId } from "@/websocket/middlewares/attachCurrentUserId";
import { auth } from "@/websocket/middlewares/auth";
import { checkCurrentUserStatus } from "@/websocket/middlewares/checkCurrentUserStatus";
import { checkDataFields } from "@/websocket/middlewares/checkDataFields";
import { checkEventAvailability } from "@/websocket/middlewares/checkEventAvailability";

const middlewares = {
  attachCurrentUserId,
  auth,
  checkCurrentUserStatus,
  checkDataFields,
  checkEventAvailability,
};

export { middlewares };
