import { attachCurrentUserId } from "@/websocket/middlewares/attachCurrentUserId";
import { auth } from "@/websocket/middlewares/auth";
import { checkDataFields } from "@/websocket/middlewares/checkDataFields";
import { checkCurrentUserStatus } from "@/websocket/middlewares/checkCurrentUserStatus";
import { checkEventAvailability } from "@/websocket/middlewares/checkEventAvailability";

const middlewares = {
  attachCurrentUserId,
  auth,
  checkDataFields,
  checkCurrentUserStatus,
  checkEventAvailability,
};

export { middlewares };
